#!/bin/sh

# Setup steps for working with LocalStack and DynamoDB local

echo "Setting AWS environment variables for LocalStack"
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_SESSION_TOKEN=test
export AWS_DEFAULT_REGION=us-east-1

echo 'Waiting for LocalStack S3...'
until (curl http://localhost:4566/_localstack/health 2>&1 | grep '"s3"' | grep -E '(running|available)' > /dev/null); do
    sleep 5
done
echo 'LocalStack S3 Ready'

echo "Creating LocalStack S3 bucket: fragments"
aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket fragments

echo "Creating DynamoDB-Local DynamoDB table: fragments"
aws --endpoint-url=http://localhost:8000 \
dynamodb create-table \
    --table-name fragments \
    --attribute-definitions \
        AttributeName=ownerId,AttributeType=S \
        AttributeName=id,AttributeType=S \
    --key-schema \
        AttributeName=ownerId,KeyType=HASH \
        AttributeName=id,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=10,WriteCapacityUnits=5

echo "Waiting for fragments table to be active..."
aws --endpoint-url=http://localhost:8000 dynamodb wait table-exists --table-name fragments

echo "Setup complete!"
