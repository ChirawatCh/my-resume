# AWS S3 + CloudFront Deployment Guide

This guide covers deploying the Next.js resume application to AWS S3 with CloudFront CDN for optimal performance and global distribution.

## Current Production Infrastructure

- **S3 Bucket:** `chirawat.info.nextjs` (region: ap-southeast-7)
- **CloudFront Distribution ID:** `E3JUX6LFH6K47F`
- **CloudFront Domain:** `d253sa7khuajeg.cloudfront.net`
- **Custom Domain:** `https://chirawat.info`
- **Deployment Script:** `deploy-to-s3.sh` (automated deployment + cache invalidation)

## Prerequisites

- AWS Account with appropriate permissions
- AWS CLI installed and configured
- Node.js 18+ and npm installed
- Your Next.js application configured for static export

## Step 1: Configure Next.js for Static Export

Your Next.js application has already been configured for static export with the following settings in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

## Step 2: Build Your Application

1. Navigate to your Next.js project directory:
```bash
cd nextjs-resume
```

2. Install dependencies:
```bash
npm install
```

3. Build and export your application:
```bash
npm run build
```

This will create an `out` directory containing your static files.

## Step 3: Create S3 Bucket

1. **Create a new S3 bucket:**
```bash
aws s3 mb s3://your-resume-website-bucket-name
```

2. **Enable static website hosting:**
```bash
aws s3 website s3://your-resume-website-bucket-name --index-document index.html --error-document 404.html
```

3. **Configure bucket policy for public access:**

Create a file named `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-resume-website-bucket-name/*"
    }
  ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy --bucket your-resume-website-bucket-name --policy file://bucket-policy.json
```

## Step 4: Upload Your Static Files

1. **Upload the contents of the `out` directory:**
```bash
aws s3 sync out/ s3://your-resume-website-bucket-name --delete
```

2. **Set correct content types for CSS and JS files:**
```bash
aws s3 cp s3://your-resume-website-bucket-name s3://your-resume-website-bucket-name --recursive --exclude "*" --include "*.css" --content-type "text/css" --metadata-directive REPLACE
```

```bash
aws s3 cp s3://your-resume-website-bucket-name s3://your-resume-website-bucket-name --recursive --exclude "*" --include "*.js" --content-type "application/javascript" --metadata-directive REPLACE
```

## Step 5: Configure CloudFront Distribution (Recommended)

CloudFront provides better performance, HTTPS support, and custom domain capabilities.

1. **Create CloudFront distribution:**
```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

Create `cloudfront-config.json`:
```json
{
  "CallerReference": "resume-website-2024",
  "Comment": "Resume Website Distribution",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-your-resume-website-bucket-name",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0,
    "Compress": true
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-your-resume-website-bucket-name",
        "DomainName": "your-resume-website-bucket-name.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "Enabled": true,
  "DefaultRootObject": "index.html",
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/404.html",
        "ResponseCode": "404"
      }
    ]
  }
}
```

## Step 6: Configure Custom Domain (Optional)

1. **Add custom domain to CloudFront:**
   - Go to AWS CloudFront Console
   - Select your distribution
   - Click "Edit"
   - Add your domain name to "Alternate Domain Names (CNAMEs)"

2. **Request SSL Certificate:**
```bash
aws acm request-certificate --domain-name your-domain.com --validation-method DNS --region us-east-1
```

3. **Update DNS records:**
   - Add CNAME record pointing your domain to CloudFront distribution domain
   - Add validation records for SSL certificate

## Quick Deployment (Recommended)

### Using the Automated Script

The project includes a ready-to-use `deploy-to-s3.sh` script:

```bash
# 1. Build the application
npm run build

# 2. Deploy to S3 and invalidate CloudFront cache
./deploy-to-s3.sh
```

### What the Script Does

The `deploy-to-s3.sh` script automatically handles:

1. **Validates Prerequisites**
   - Checks AWS CLI is configured
   - Verifies build directory exists

2. **Uploads Static Assets**
   - Syncs files to S3 bucket `chirawat.info.nextjs`
   - Sets cache-control: `public, max-age=31536000` (1 year) for assets
   - Deletes removed files with `--delete` flag

3. **Uploads HTML Files**
   - Sets cache-control: `no-cache` for HTML files
   - Ensures fresh content on every visit

4. **Configures S3 Website Hosting**
   - Sets index document to `index.html`
   - Sets error document to `404.html`

5. **Invalidates CloudFront Cache**
   - Creates invalidation for distribution `E3JUX6LFH6K47F`
   - Clears all paths (`/*`)
   - Takes 2-5 minutes to propagate globally

### Script Contents

```bash
#!/bin/bash
set -e

BUCKET_NAME="chirawat.info.nextjs"
BUILD_DIR="out"
DISTRIBUTION_ID="E3JUX6LFH6K47F"

echo "🚀 Starting deployment to S3 bucket: $BUCKET_NAME"

# Check AWS CLI configuration
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Check build directory
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build directory '$BUILD_DIR' not found. Please run 'npm run build' first."
    exit 1
fi

# Upload static assets with 1-year cache
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "*.txt"

# Upload HTML files with no-cache
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME --delete \
    --cache-control "no-cache" \
    --include "*.html" \
    --include "*.txt"

# Configure website hosting
aws s3 website s3://$BUCKET_NAME \
    --index-document index.html \
    --error-document 404.html

# Invalidate CloudFront cache
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

echo "✅ Deployment completed successfully!"
echo "⏳ CloudFront invalidation: $INVALIDATION_ID (2-5 minutes)"
echo "🔗 Your website: https://chirawat.info"
```

Make the script executable:
```bash
chmod +x deploy-to-s3.sh
```

## Manual Deployment Steps

If you prefer to deploy manually without the script:

### Step 1: Build the Application
```bash
npm run build
```

### Step 2: Upload to S3
```bash
# Upload with appropriate cache headers
aws s3 sync out/ s3://chirawat.info.nextjs --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" --exclude "*.txt"

aws s3 sync out/ s3://chirawat.info.nextjs --delete \
    --cache-control "no-cache" \
    --include "*.html" --include "*.txt"
```

### Step 3: Configure S3 Website Hosting
```bash
aws s3 website s3://chirawat.info.nextjs \
    --index-document index.html \
    --error-document 404.html
```

### Step 4: Invalidate CloudFront Cache
```bash
aws cloudfront create-invalidation \
    --distribution-id E3JUX6LFH6K47F \
    --paths "/*"
```

## Monitoring Deployment

### Check CloudFront Invalidation Status
```bash
aws cloudfront get-invalidation \
    --distribution-id E3JUX6LFH6K47F \
    --id YOUR_INVALIDATION_ID
```

### Check S3 Bucket Contents
```bash
aws s3 ls s3://chirawat.info.nextjs --recursive
```

### Test Website
```bash
# Test CloudFront distribution
curl -I https://d253sa7khuajeg.cloudfront.net

# Test custom domain
curl -I https://chirawat.info
```

## Continuous Deployment with GitHub Actions (Optional)

Set up GitHub Actions for automatic deployment:

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to S3

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build application
      run: npm run build
      
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-east-1
        
    - name: Deploy to S3
      run: |
        aws s3 sync out/ s3://chirawat.info.nextjs --delete \
          --cache-control "public, max-age=31536000" \
          --exclude "*.html" --exclude "*.txt"
        aws s3 sync out/ s3://chirawat.info.nextjs --delete \
          --cache-control "no-cache" \
          --include "*.html" --include "*.txt"
        aws cloudfront create-invalidation \
          --distribution-id E3JUX6LFH6K47F \
          --paths "/*"
```

## Troubleshooting

1. **404 Errors on Refresh:**
   - Ensure your S3 bucket has error document set to `index.html`
   - Configure CloudFront custom error pages

2. **CSS/JS Not Loading:**
   - Verify content types are set correctly
   - Check S3 bucket policy allows public access

3. **Images Not Displaying:**
   - Ensure `images.unoptimized: true` in next.config.ts
   - Verify image paths are correct in your components

## Cost Estimation

- S3 Storage: ~$0.02/GB per month
- CloudFront: ~$0.085/GB for first 10TB
- Route 53 (if using custom domain): $0.50/month per hosted zone

## Security Considerations

1. Use CloudFront with Origin Access Identity for better security
2. Enable AWS CloudTrail for audit logging
3. Consider using AWS WAF for additional protection
4. Regularly review S3 bucket policies

## Performance Optimization

1. Enable Gzip compression in CloudFront
2. Set appropriate cache headers
3. Use CloudFront edge locations for global performance
4. Optimize images before deployment

## Access URLs

Your resume website is accessible at:
- **Primary (Custom Domain):** https://chirawat.info
- **CloudFront Distribution:** https://d253sa7khuajeg.cloudfront.net
- **S3 Website URL:** http://chirawat.info.nextjs.s3-website-ap-southeast-7.amazonaws.com

## Quick Reference

### Common Commands

```bash
# Build the application
npm run build

# Deploy (automated)
./deploy-to-s3.sh

# Check CloudFront status
aws cloudfront get-distribution --id E3JUX6LFH6K47F

# List invalidations
aws cloudfront list-invalidations --distribution-id E3JUX6LFH6K47F

# Check S3 bucket
aws s3 ls s3://chirawat.info.nextjs
```

### Infrastructure Details

- **S3 Bucket:** `chirawat.info.nextjs`
- **S3 Region:** ap-southeast-7
- **CloudFront Distribution:** E3JUX6LFH6K47F
- **CloudFront Domain:** d253sa7khuajeg.cloudfront.net
- **Custom Domain:** chirawat.info
- **SSL Certificate:** Managed by AWS Certificate Manager