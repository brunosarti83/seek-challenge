import json
import uuid
from utils.db import get_users_collection
from utils.auth import hash_password, generate_token
from utils.models.user import UserCreate, User

def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])
        user_create = UserCreate(**data)
        
        # Check if email already exists
        if get_users_collection().find_one({"email": user_create.email}):
            return {
                "statusCode": 409,
                "body": json.dumps({"error": "Email already exists"}),
                "headers": {"Content-Type": "application/json"}
            }
        
        user_dict = {
            "user_id": str(uuid.uuid4()),
            "email": user_create.email,
            "password": hash_password(user_create.password)
        }
        get_users_collection().insert_one(user_dict)
        user = User(user_id=user_dict["user_id"], email=user_dict["email"])
        token = generate_token(user.user_id)
        
        return {
            "statusCode": 201,
            "body": json.dumps({"user": user.dict(), "token": token}),
            "headers": {"Content-Type": "application/json"}
        }
    except ValueError as e:
        return {"statusCode": 422, "body": json.dumps({"error": str(e)})}
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}