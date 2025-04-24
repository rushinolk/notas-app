#!/bin/bash

ECR_REGISTRY="572048499167.dkr.ecr.us-east-1.amazonaws.com"
REPO_NAME="aws_notas"
REGION="us-east-1"

aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

docker build -t $REPO_NAME:backend backend/
docker tag $REPO_NAME:backend $ECR_REGISTRY/$REPO_NAME:backend
docker push $ECR_REGISTRY/$REPO_NAME:backend

docker build -t $REPO_NAME:frontend frontend/
docker tag $REPO_NAME:frontend $ECR_REGISTRY/$REPO_NAME:frontend
docker push $ECR_REGISTRY/$REPO_NAME:frontend
