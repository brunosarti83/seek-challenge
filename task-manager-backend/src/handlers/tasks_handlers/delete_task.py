import json
from src.common.db import get_tasks_collection
from src.common.auth import verify_token

def lambda_handler(event, context):
    try:
        verify_token(event)
        task_id = event["pathParameters"]["id"]
        result = get_tasks_collection().delete_one({"id": task_id})
        if result.deleted_count == 0:
            return {"statusCode": 404, "body": json.dumps({"error": "Task not found"})}
        return {
            "statusCode": 204, 
            "body": "",
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
        }
    except Exception as e:
        return {
            "statusCode": 401 if "Unauthorized" in str(e) else 500, 
            "body": json.dumps({"error": str(e)}),
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
        }