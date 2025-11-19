# AWS Lambda Deployment Guide for groqApiProxy

This guide provides step-by-step instructions for deploying your backend Lambda function to AWS.

## Current Production Infrastructure

- **Lambda Function Name:** `groqApiProxy`
- **AWS Region:** `ap-southeast-1` (Singapore)
- **Runtime:** Node.js 20.x
- **Handler:** `index.handler`
- **Timeout:** 30 seconds
- **Memory:** 256 MB
- **IAM Role:** `lambda-groq-execution-role`
- **Deployment Script:** `deploy-lambda.sh` (automated deployment)
- **Environment Variables:** `GROQ_API_KEY` (set via `set-env-vars.sh`)

## Prerequisites

1. **AWS CLI installed and configured**
   ```bash
   # Install AWS CLI (if not already installed)
   brew install awscli  # macOS
   # or
   pip install awscli   # Python pip

   # Configure AWS credentials
   aws configure
   ```

2. **Node.js and npm installed**
   ```bash
   node --version  # Should be 18+ for Lambda compatibility
   npm --version
   ```

3. **AWS Account with appropriate permissions**
   - Lambda function creation/update
   - IAM role creation/management
   - CloudWatch logs access

## Quick Start

### Step 1: Prepare Environment Variables

1. Copy the environment template:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `.env` file and add your actual values:
   ```bash
   # Required: Your Groq API Key
   GROQ_API_KEY=your_actual_groq_api_key_here

   # AWS Configuration (optional)
   AWS_REGION=ap-southeast-1
   AWS_PROFILE=default

   # Lambda Configuration
   LAMBDA_FUNCTION_NAME=groqApiProxy
   LAMBDA_TIMEOUT=30
   LAMBDA_MEMORY_SIZE=256
   ```

### Step 2: Deploy the Lambda Function

Run the deployment script:
```bash
./deploy-lambda.sh
```

The script will:
- ✅ Install production dependencies
- ✅ Create deployment package
- ✅ Create IAM role (if needed)
- ✅ Deploy/update Lambda function
- ✅ Configure function URL
- ✅ Set up CORS for frontend access

### Step 3: Set Environment Variables

After deployment, set your environment variables:
```bash
./set-env-vars.sh
```

This will securely upload your `GROQ_API_KEY` to the Lambda function.

## What Each Script Does

### `deploy-lambda.sh`
- **Function**: Automates complete Lambda deployment
- **Creates**: IAM role, Lambda function, function URL
- **Configures**: Runtime settings, CORS, timeout
- **Output**: Function URL for frontend integration

### `set-env-vars.sh`
- **Function**: Manages environment variables securely
- **Reads**: Values from `.env` file
- **Updates**: Lambda function configuration
- **Security**: Keeps sensitive data out of code

## Configuration Options

You can modify these settings in the scripts:

### Lambda Function Settings
```bash
FUNCTION_NAME="groqApiProxy"      # Lambda function name
REGION="ap-southeast-1"           # AWS region
RUNTIME="nodejs20.x"              # Node.js version
TIMEOUT=30                        # Function timeout (seconds)
MEMORY_SIZE=256                   # Memory allocation (MB)
```

### IAM Role
- **Name**: `lambda-groq-execution-role`
- **Permissions**: Basic Lambda execution + CloudWatch logs
- **Trust Policy**: Allows Lambda service to assume role

## Updating Your Function

To update your Lambda function after making code changes:

```bash
# Just run the deployment script again
./deploy-lambda.sh
```

The script automatically detects if the function exists and updates it accordingly.

## Troubleshooting

### Common Issues

1. **AWS CLI not configured**
   ```bash
   aws configure list
   # If empty, run: aws configure
   ```

2. **Permission denied errors**
   ```bash
   chmod +x deploy-lambda.sh
   chmod +x set-env-vars.sh
   ```

3. **Function doesn't exist error**
   - Run `deploy-lambda.sh` first to create the function
   - Then run `set-env-vars.sh` to set environment variables

4. **GROQ_API_KEY not set**
   - Check your `.env` file exists and contains the API key
   - Ensure no extra spaces or quotes around the key

### Checking Deployment Status

```bash
# Check if function exists
aws lambda get-function --function-name groqApiProxy --region ap-southeast-1

# Check function URL
aws lambda get-function-url-config --function-name groqApiProxy --region ap-southeast-1

# Check environment variables
aws lambda get-function-configuration --function-name groqApiProxy --region ap-southeast-1
```

## Security Notes

- ✅ API keys are stored as environment variables, not in code
- ✅ CORS is configured for web frontend access
- ✅ Function URL uses HTTPS by default
- ⚠️ Current CORS allows all origins (`*`) - restrict in production
- ⚠️ Function URL has no authentication - add API Gateway for production

## Next Steps

After successful deployment:

1. **Test the function** using the provided function URL
2. **Update your frontend** to use the new Lambda endpoint
3. **Monitor logs** in AWS CloudWatch for any issues
4. **Consider API Gateway** for production authentication/rate limiting

## Production Considerations

For production deployment, consider:

- **API Gateway**: Add authentication, rate limiting, custom domains
- **CORS**: Restrict to specific frontend domains
- **Monitoring**: Set up CloudWatch alarms
- **Environment**: Use separate dev/staging/prod functions
- **Secrets**: Use AWS Secrets Manager for sensitive data

## Quick Reference

### Common Commands

```bash
# Deploy Lambda function
./deploy-lambda.sh

# Set environment variables
./set-env-vars.sh

# Check function status
aws lambda get-function \
    --function-name groqApiProxy \
    --region ap-southeast-1

# Get function URL
aws lambda get-function-url-config \
    --function-name groqApiProxy \
    --region ap-southeast-1

# View logs
aws logs tail /aws/lambda/groqApiProxy \
    --follow \
    --region ap-southeast-1

# Update environment variables manually
aws lambda update-function-configuration \
    --function-name groqApiProxy \
    --environment Variables='{GROQ_API_KEY=your_key}' \
    --region ap-southeast-1

# Test function
aws lambda invoke \
    --function-name groqApiProxy \
    --payload '{"body":"{\"message\":\"test\"}"}' \
    --region ap-southeast-1 \
    response.json
```

### Infrastructure Details

- **Function Name:** groqApiProxy
- **Region:** ap-southeast-1
- **Runtime:** nodejs20.x
- **Handler:** index.handler
- **Timeout:** 30 seconds
- **Memory:** 256 MB
- **IAM Role:** lambda-groq-execution-role
- **Environment Variables:** GROQ_API_KEY
- **LLM Model:** qwen/qwen3-32b (via Groq)
- **Temperature:** 0.7
- **Max Tokens:** 1024

### Files in Backend Directory

- `index.mjs` - Lambda handler code
- `resumeContent.txt` - Resume content for LLM context
- `package.json` - Node.js dependencies
- `deploy-lambda.sh` - Automated deployment script
- `set-env-vars.sh` - Environment variables setup script
- `.env.example` - Environment variables template
- `API-test.html` - Test interface for the API
- `LAMBDA_DEPLOYMENT_GUIDE.md` - This guide