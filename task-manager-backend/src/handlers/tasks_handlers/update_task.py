import json
from common.db import get_tasks_collection
from common.auth import verify_token
from common.models.task import TaskUpdate

def lambda_handler(event, context):
    try:
        verify_token(event)
        task_id = event["pathParameters"]["id"]
        data = json.loads(event["body"])
        task_update = TaskUpdate(**data)
        update_dict = task_update.dict(exclude_unset=True)
        if not update_dict:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "No fields provided to update"}),
                "headers": {"Content-Type": "application/json"}
            }
        result = get_tasks_collection().update_one(
            {"id": task_id}, {"$set": update_dict}
        )
        if result.matched_count == 0:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "Task not found"}),
                "headers": {"Content-Type": "application/json"}
            }
        return {
            "statusCode": 200,
            "body": json.dumps(update_dict),
            "headers": {"Content-Type": "application/json"}
        }
    except ValueError as e:
        return {"statusCode": 422, "body": json.dumps({"error": str(e)})}
    except Exception as e:
        return {"statusCode": 401 if "Unauthorized" in str(e) else 500, "body": json.dumps({"error": str(e)})}