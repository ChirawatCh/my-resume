# AWS S3 Deployment Guide for Next.js Resume

This guide will walk you through deploying your Next.js resume application to AWS S3 as a static website with CloudFront CDN for optimal performance.

## Prerequisites

- AWS Account
- AWS CLI installed and configured
- Node.js and npm installed
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

## Step 7: Automation Script

Create a deployment script `deploy.sh`:
```bash
#!/bin/bash

# Build the application
echo "Building Next.js application..."
npm run build

# Upload to S3
echo "Uploading to S3..."
aws s3 sync out/ s3://your-resume-website-bucket-name --delete

# Set content types
echo "Setting content types..."
aws s3 cp s3://your-resume-website-bucket-name s3://your-resume-website-bucket-name --recursive --exclude "*" --include "*.css" --content-type "text/css" --metadata-directive REPLACE

aws s3 cp s3://your-resume-website-bucket-name s3://your-resume-website-bucket-name --recursive --exclude "*" --include "*.js" --content-type "application/javascript" --metadata-directive REPLACE

# Invalidate CloudFront cache
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

## Step 8: Environment Variables

For your chatbot API endpoint, ensure you're using the correct production URL in your Next.js app.

## Step 9: Continuous Deployment (Optional)

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
        aws s3 sync out/ s3://your-resume-website-bucket-name --delete
        aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
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

Your resume website will be accessible at:
- S3 Website URL: `http://your-resume-website-bucket-name.s3-website-region.amazonaws.com`
- CloudFront URL: `https://your-distribution-id.cloudfront.net`
- Custom Domain: `https://your-domain.com` (if configured)