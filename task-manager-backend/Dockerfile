FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env
COPY .serverlessrc /root/.serverlessrc

EXPOSE 3000

CMD ["npx", "serverless", "offline", "--host", "0.0.0.0"]