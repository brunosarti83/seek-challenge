import jwt
import os
from datetime import datetime, timedelta, timezone
import bcrypt
from dotenv import load_dotenv
from src.common.models.user import User

load_dotenv()

SECRET_KEY = os.environ["JWT_SECRET"]

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def generate_token(user_id: str) -> str:
    payload = {
        "user_id": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=1)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_token(event) -> str:
    auth_header = event["headers"].get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        raise Exception("Unauthorized: No token provided")
    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["user_id"]
    except jwt.InvalidTokenError:
        raise Exception("Unauthorized: Invalid token")