#!/bin/bash

# AWS S3 Deployment Script for Next.js Static Site

set -e

BUCKET_NAME="chirawat.info.nextjs"
BUILD_DIR="out"

echo "🚀 Starting deployment to S3 bucket: $BUCKET_NAME"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build directory '$BUILD_DIR' not found. Please run 'npm run build' first."
    exit 1
fi

echo "📁 Build directory found: $BUILD_DIR"

# Sync files to S3
echo "📤 Uploading files to S3..."
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "*.html" \
    --exclude "*.txt"

# Upload HTML files with different cache control
echo "📄 Uploading HTML files with no-cache..."
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME --delete \
    --cache-control "no-cache" \
    --include "*.html" \
    --include "*.txt"

# Configure website hosting
echo "🌐 Configuring S3 website hosting..."
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document 404.html

echo "✅ Deployment completed successfully!"
echo "🔗 Your website should be available at: http://$BUCKET_NAME.s3-website-$(aws configure get region).amazonaws.com"
echo "🔗 Or if using custom domain: https://chirawat.info"