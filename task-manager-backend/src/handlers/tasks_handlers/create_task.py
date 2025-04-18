import json
import uuid
from src.common.db import get_tasks_collection
from src.common.auth import verify_token
from src.common.models.task import TaskCreate, Task

def lambda_handler(event, context):
    try:
        verify_token(event)
        data = json.loads(event["body"])
        task_create = TaskCreate(**data)
        task_dict = task_create.model_dump()
        task_dict["id"] = str(uuid.uuid4())
        get_tasks_collection().insert_one(task_dict)
        task_dict.pop("_id", None)
        task = Task(**task_dict)
        return {
            "statusCode": 201,
            "body": json.dumps(task.model_dump()),
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
        }
    except ValueError as e:
        return {
            "statusCode": 422,
            "body": json.dumps({"error": str(e)}),
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
        }
    except Exception as e:
        return {
            "statusCode": 401 if "Unauthorized" in str(e) else 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
        }