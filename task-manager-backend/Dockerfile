FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Copy and install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Install Serverless and plugins (latest v4)
COPY package*.json ./
RUN npm install

# Copy app code, .env, and Serverless credentials
COPY . .
COPY .env .env
COPY .serverlessrc /root/.serverlessrc
# Expose serverless-offline port
EXPOSE 3000

# Run serverless-offline
CMD ["npx", "serverless", "offline", "--host", "0.0.0.0"]