ECR_REGISTRY="572048499167.dkr.ecr.us-east-1.amazonaws.com"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REGISTRY
docker build -t aws_notasapp .
docker tag aws_notasapp:latest $ECR_REGISTRY/aws_notasapp:latest
docker push $ECR_REGISTRY/aws_notasapp: