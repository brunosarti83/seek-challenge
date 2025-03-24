## Seek Tasks - Bruno Sarti

This project uses the Serverless Framework to deploy a Python 3.12 backend to AWS Lambda and API Gateway.

### Setup

### npm install

to install serverless-python-requirements & serverless offline (already listed in package.json)

### setup AWS env secrets

aws ssm put-parameter --name "/task-manager/MONGO_URI" --value "mongodb+srv://<user>:<pass>@cluster0.mongodb.net/taskdb" --type "SecureString" --overwrite
aws ssm put-parameter --name "/task-manager/JWT_SECRET" --value "your-secret-key" --type "SecureString" --overwrite

### command to deploy

serverless deploy

### command to run serverless locally

serverless offline
