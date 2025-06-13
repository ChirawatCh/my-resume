#!/bin/bash

# AWS Configuration Update Script
# Update CloudFront and Route 53 to use new bucket: ***********
# Domain: ***********

set -e

OLD_BUCKET="your-previous-bucket-name"
NEW_BUCKET="your-new-bucket-name"
DOMAIN="your-domain.com"

echo "🔄 Updating AWS configuration for domain: $DOMAIN"
echo "📦 Old bucket: $OLD_BUCKET"
echo "📦 New bucket: $NEW_BUCKET"

# Get AWS region
REGION=$(aws configure get region)
if [ -z "$REGION" ]; then
    REGION="us-east-1"
    echo "⚠️  No region configured, using default: $REGION"
fi

echo "🌍 Using region: $REGION"

# Find CloudFront distribution for the domain
echo "🔍 Finding CloudFront distribution..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, '$DOMAIN')].Id" --output text)

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "❌ No CloudFront distribution found for domain: $DOMAIN"
    exit 1
fi

echo "📡 Found CloudFront distribution: $DISTRIBUTION_ID"

# Get current distribution config
echo "📋 Getting current CloudFront configuration..."
aws cloudfront get-distribution-config --id $DISTRIBUTION_ID > /tmp/cloudfront-config.json

# Extract ETag for update
ETAG=$(jq -r '.ETag' /tmp/cloudfront-config.json)
echo "🏷️  ETag: $ETAG"

# Update the origin domain name in the config
echo "✏️  Updating origin domain name..."
jq --arg new_origin "$NEW_BUCKET.s3.$REGION.amazonaws.com" \
   '.DistributionConfig.Origins.Items[0].DomainName = $new_origin' \
   /tmp/cloudfront-config.json | jq '.DistributionConfig' > /tmp/updated-config.json

# Update CloudFront distribution
echo "🔄 Updating CloudFront distribution..."
aws cloudfront update-distribution \
    --id $DISTRIBUTION_ID \
    --distribution-config file:///tmp/updated-config.json \
    --if-match $ETAG > /tmp/update-result.json

echo "✅ CloudFront distribution updated successfully!"

# Get the new ETag and status
NEW_ETAG=$(jq -r '.ETag' /tmp/update-result.json)
STATUS=$(jq -r '.Distribution.Status' /tmp/update-result.json)

echo "📊 New ETag: $NEW_ETAG"
echo "📊 Status: $STATUS"

# Create invalidation to clear cache
echo "🗑️  Creating CloudFront invalidation..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --query 'Invalidation.Id' --output text)

echo "🔄 Invalidation created: $INVALIDATION_ID"

# Find hosted zone for the domain
echo "🔍 Finding Route 53 hosted zone..."
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones --query "HostedZones[?Name=='$DOMAIN.'].Id" --output text | cut -d'/' -f3)

if [ -z "$HOSTED_ZONE_ID" ]; then
    echo "❌ No Route 53 hosted zone found for domain: $DOMAIN"
    exit 1
fi

echo "🌐 Found hosted zone: $HOSTED_ZONE_ID"

# Get CloudFront domain name
CLOUDFRONT_DOMAIN=$(jq -r '.Distribution.DomainName' /tmp/update-result.json)
echo "📡 CloudFront domain: $CLOUDFRONT_DOMAIN"

# Update Route 53 A record to point to CloudFront
echo "✏️  Updating Route 53 A record..."
cat > /tmp/route53-change.json << EOF
{
    "Changes": [{
        "Action": "UPSERT",
        "ResourceRecordSet": {
            "Name": "$DOMAIN",
            "Type": "A",
            "AliasTarget": {
                "DNSName": "$CLOUDFRONT_DOMAIN",
                "EvaluateTargetHealth": false,
                "HostedZoneId": "Z2FDTNDATAQYW2"
            }
        }
    }]
}
EOF

CHANGE_ID=$(aws route53 change-resource-record-sets \
    --hosted-zone-id $HOSTED_ZONE_ID \
    --change-batch file:///tmp/route53-change.json \
    --query 'ChangeInfo.Id' --output text)

echo "🔄 Route 53 change submitted: $CHANGE_ID"

# Clean up temp files
rm -f /tmp/cloudfront-config.json /tmp/updated-config.json /tmp/update-result.json /tmp/route53-change.json

echo ""
echo "✅ Configuration update completed!"
echo "📊 Summary:"
echo "   - CloudFront Distribution: $DISTRIBUTION_ID (Status: $STATUS)"
echo "   - Invalidation: $INVALIDATION_ID"
echo "   - Route 53 Change: $CHANGE_ID"
echo "   - New Origin: $NEW_BUCKET.s3.$REGION.amazonaws.com"
echo ""
echo "⏳ Note: CloudFront deployment may take 10-15 minutes to complete."
echo "🔗 Your site will be available at: https://$DOMAIN"