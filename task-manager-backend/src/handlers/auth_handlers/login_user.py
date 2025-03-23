import json
from src.common.db import get_users_collection
from src.common.auth import verify_password, generate_token
from src.common.models.user import UserLogin, User

def lambda_handler(event, context):
    try:
        data = json.loads(event["body"])
        user_login = UserLogin(**data)
        
        user_doc = get_users_collection().find_one({"email": user_login.email})
        if not user_doc or not verify_password(user_login.password, user_doc["password"]):
            return {
                "statusCode": 401,
                "body": json.dumps({"error": "Invalid email or password"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }
        
        user = User(user_id=user_doc["user_id"], email=user_doc["email"])
        token = generate_token(user.user_id)
        
        return {
            "statusCode": 200,
            "body": json.dumps({"user": user.model_dump(), "token": token}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    except ValueError as e:
        return {
            "statusCode": 422, 
            "body": json.dumps({"error": str(e)}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
    except Exception as e:
        return {
            "statusCode": 500, 
            "body": json.dumps({"error": str(e)}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }