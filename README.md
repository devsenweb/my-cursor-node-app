# my-cursor-node-app

A simple Node.js microservice that returns JSON, ready for Docker and Kubernetes deployment.

## Local Development

```sh
npm install
npm start
```

Visit [http://localhost:3000/api/hello](http://localhost:3000/api/hello)

## Docker

Build and run locally:

```sh
docker build -t my-cursor-node-app .
docker run -p 3000:3000 my-cursor-node-app
```

## Kubernetes (EKS)

1. Push your Docker image to a registry (Docker Hub or ECR).
2. Use a deployment YAML like below:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-cursor-node-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-cursor-node-app
  template:
    metadata:
      labels:
        app: my-cursor-node-app
    spec:
      containers:
      - name: my-cursor-node-app
        image: <your-dockerhub-username>/my-cursor-node-app:latest
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: my-cursor-node-app-service
spec:
  type: LoadBalancer
  selector:
    app: my-cursor-node-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```

Replace `<your-dockerhub-username>` with your Docker Hub username or ECR repo. 