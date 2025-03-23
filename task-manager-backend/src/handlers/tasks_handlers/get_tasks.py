import json
from src.common.db import get_tasks_collection
from src.common.auth import verify_token
from src.common.models.task import Task

def lambda_handler(event, context):
    try:
        verify_token(event)
        tasks_raw = list(get_tasks_collection().find({}, {"_id": 0}))
        tasks = [Task(**task).model_dump() for task in tasks_raw]
        return {
            "statusCode": 200,
            "body": json.dumps(tasks),
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
        }
    except Exception as e:
        return {
            "statusCode": 401 if "Unauthorized" in str(e) else 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
        }