#!/bin/bash

# AWS Lambda Deployment Script for groqApiProxy
# This script automates the deployment of the backend Lambda function

set -e  # Exit on any error

# Configuration
FUNCTION_NAME="groqApiProxy"
REGION="ap-southeast-1"  # Change to your preferred region
RUNTIME="nodejs20.x"
HANDLER="index.handler"
ZIP_FILE="lambda-deployment.zip"
TIMEOUT=30
MEMORY_SIZE=256

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting AWS Lambda deployment for ${FUNCTION_NAME}...${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if we're in the backend directory
if [ ! -f "index.mjs" ] || [ ! -f "package.json" ]; then
    echo -e "${RED}Please run this script from the backend directory containing index.mjs and package.json${NC}"
    exit 1
fi

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install --production

# Create deployment package
echo -e "${YELLOW}Creating deployment package...${NC}"
zip -r $ZIP_FILE . -x "*.sh" "*.git*" "*.md" "API-test.html" "BACKEND_GUIDE.md"

# Check if Lambda function exists
echo -e "${YELLOW}Checking if Lambda function exists...${NC}"
if aws lambda get-function --function-name $FUNCTION_NAME --region $REGION &> /dev/null; then
    echo -e "${BLUE}Function exists. Updating function code...${NC}"
    
    # Update function code
    aws lambda update-function-code \
        --function-name $FUNCTION_NAME \
        --zip-file fileb://$ZIP_FILE \
        --region $REGION
    
    echo -e "${GREEN}Function code updated successfully!${NC}"
else
    echo -e "${BLUE}Function does not exist. Creating new function...${NC}"
    
    # Check if IAM role exists
    ROLE_NAME="lambda-groq-execution-role"
    ROLE_ARN="arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/$ROLE_NAME"
    
    if ! aws iam get-role --role-name $ROLE_NAME &> /dev/null; then
        echo -e "${YELLOW}Creating IAM role for Lambda...${NC}"
        
        # Create trust policy
        cat > trust-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
        
        # Create IAM role
        aws iam create-role \
            --role-name $ROLE_NAME \
            --assume-role-policy-document file://trust-policy.json
        
        # Attach basic execution policy
        aws iam attach-role-policy \
            --role-name $ROLE_NAME \
            --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
        
        echo -e "${GREEN}IAM role created successfully!${NC}"
        
        # Wait for role to be available
        echo -e "${YELLOW}Waiting for IAM role to be available...${NC}"
        sleep 10
        
        # Clean up temporary files
        rm trust-policy.json
    fi
    
    # Create Lambda function
    aws lambda create-function \
        --function-name $FUNCTION_NAME \
        --runtime $RUNTIME \
        --role $ROLE_ARN \
        --handler $HANDLER \
        --zip-file fileb://$ZIP_FILE \
        --timeout $TIMEOUT \
        --memory-size $MEMORY_SIZE \
        --region $REGION
    
    echo -e "${GREEN}Lambda function created successfully!${NC}"
fi

# Set environment variables (you'll need to set GROQ_API_KEY manually or via AWS CLI)
echo -e "${YELLOW}Setting up environment variables...${NC}"
echo -e "${RED}IMPORTANT: You need to set the GROQ_API_KEY environment variable manually!${NC}"
echo -e "${BLUE}Run the following command to set your API key:${NC}"
echo -e "aws lambda update-function-configuration --function-name $FUNCTION_NAME --environment Variables='{GROQ_API_KEY=your_actual_api_key_here}' --region $REGION"

# Configure function URL (for direct HTTP access)
echo -e "${YELLOW}Configuring function URL...${NC}"
if aws lambda get-function-url-config --function-name $FUNCTION_NAME --region $REGION &> /dev/null; then
    echo -e "${BLUE}Function URL already exists.${NC}"
else
    aws lambda create-function-url-config \
        --function-name $FUNCTION_NAME \
        --auth-type NONE \
        --cors '{
            "AllowCredentials": false,
            "AllowHeaders": ["Content-Type"],
            "AllowMethods": ["POST", "OPTIONS"],
            "AllowOrigins": ["*"],
            "ExposeHeaders": [],
            "MaxAge": 86400
        }' \
        --region $REGION
    
    echo -e "${GREEN}Function URL created successfully!${NC}"
fi

# Get function URL
FUNCTION_URL=$(aws lambda get-function-url-config --function-name $FUNCTION_NAME --region $REGION --query 'FunctionUrl' --output text)

# Clean up
rm $ZIP_FILE

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${BLUE}Function Name: ${FUNCTION_NAME}${NC}"
echo -e "${BLUE}Function URL: ${FUNCTION_URL}${NC}"
echo -e "${YELLOW}Don't forget to set your GROQ_API_KEY environment variable!${NC}"