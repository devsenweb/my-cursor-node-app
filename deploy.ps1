# Set your AWS region
$AWS_REGION = "us-east-1"  # Change this to your preferred region

# Get AWS account ID
$AWS_ACCOUNT_ID = aws sts get-caller-identity --query Account --output text

# Create ECR repository if it doesn't exist
aws ecr create-repository --repository-name my-cursor-node-app --region $AWS_REGION

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build and tag the Docker image
docker build -t my-cursor-node-app .
docker tag my-cursor-node-app:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-cursor-node-app:latest

# Push the image to ECR
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/my-cursor-node-app:latest

# Update the deployment.yaml with actual values
(Get-Content deployment.yaml) -replace '\${AWS_ACCOUNT_ID}', $AWS_ACCOUNT_ID | Set-Content deployment.yaml
(Get-Content deployment.yaml) -replace '\${AWS_REGION}', $AWS_REGION | Set-Content deployment.yaml

# Apply the Kubernetes deployment
kubectl apply -f deployment.yaml

# Wait for the deployment to be ready
kubectl rollout status deployment/my-cursor-node-app

# Get the LoadBalancer URL
Write-Host "Waiting for LoadBalancer URL..."
kubectl get service my-cursor-node-app-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 