## Deployment to AWS

This project uses the Serverless Framework to deploy a Python 3.12 backend to AWS Lambda and API Gateway.

### Prerequisites

- **Node.js**: Install from [nodejs.org](https://nodejs.org/) (LTS recommended).
- **Serverless Framework**: Install globally with `npm install -g serverless`.
- **AWS CLI**: Install and configure with `aws configure` (IAM user needs CloudFormation, Lambda, API Gateway, IAM, S3, and SSM permissions).
- **Python 3.12**: For local development.
- **Docker**: Optional, recommended for dependency packaging on Windows (used by `serverless-python-requirements`).

### Setup

1. **Activate Virtual Environment:**
   ```bash
   cd task-manager-backend
   .\venv\Scripts\activate  # Windows
   source venv/bin/activate  # Unix-like
   ```

### npm install

to install serverless-python-requirements (already listed in package.json)

### setup AWS env secrets

aws ssm put-parameter --name "/task-manager/MONGO_URI" --value "mongodb+srv://<user>:<pass>@cluster0.mongodb.net/taskdb" --type "SecureString" --overwrite
aws ssm put-parameter --name "/task-manager/JWT_SECRET" --value "your-secret-key" --type "SecureString" --overwrite

### command to deploy

serverless deploy
