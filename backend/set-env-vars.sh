#!/bin/bash

# Script to set environment variables for the Lambda function
# Usage: ./set-env-vars.sh

set -e

# Configuration
FUNCTION_NAME="groqApiProxy"
REGION="ap-southeast-1"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Setting environment variables for Lambda function: ${FUNCTION_NAME}${NC}"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${RED}Error: .env file not found!${NC}"
    echo -e "${YELLOW}Please copy .env.example to .env and fill in your values:${NC}"
    echo -e "cp .env.example .env"
    exit 1
fi

# Source the .env file
source .env

# Check if GROQ_API_KEY is set
if [ -z "$GROQ_API_KEY" ]; then
    echo -e "${RED}Error: GROQ_API_KEY is not set in .env file${NC}"
    exit 1
fi

# Update Lambda function configuration with environment variables
echo -e "${YELLOW}Updating Lambda function environment variables...${NC}"

aws lambda update-function-configuration \
    --function-name $FUNCTION_NAME \
    --environment Variables="{GROQ_API_KEY=$GROQ_API_KEY}" \
    --region $REGION

echo -e "${GREEN}Environment variables updated successfully!${NC}"
echo -e "${BLUE}GROQ_API_KEY has been set for the Lambda function.${NC}"