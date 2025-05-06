# Build the Docker image
docker build -t my-cursor-node-app .

# Apply the Kubernetes deployment
kubectl apply -f deployment.yaml

# Wait for the deployment to be ready
Write-Host "Waiting for deployment to be ready..."
kubectl rollout status deployment/my-cursor-node-app

# Get the service URL
Write-Host "`nYour application is available at:"
Write-Host "http://localhost:30000/api/hello" 