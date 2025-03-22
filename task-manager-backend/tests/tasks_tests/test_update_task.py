import unittest
from unittest.mock import patch
from src.handlers.tasks_handlers.update_task import lambda_handler
import json

class TestUpdateTask(unittest.TestCase):
    @patch("src.handlers.tasks_handlers.update_task.get_tasks_collection")
    @patch("src.handlers.tasks_handlers.update_task.verify_token")
    def test_update_task_success(self, mock_verify, mock_db):
        event = {
            "headers": {"Authorization": "Bearer validtoken"},
            "pathParameters": {"id": "1"},
            "body": '{"status": "completed"}'
        }
        mock_db.return_value.update_one.return_value.matched_count = 1
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 200)
        body = json.loads(response["body"])
        self.assertEqual(body["status"], "completed")

    @patch("src.handlers.tasks_handlers.update_task.get_tasks_collection")
    @patch("src.handlers.tasks_handlers.update_task.verify_token")
    def test_update_task_not_found(self, mock_verify, mock_db):
        event = {
            "headers": {"Authorization": "Bearer validtoken"},
            "pathParameters": {"id": "999"},
            "body": '{"status": "completed"}'
        }
        mock_db.return_value.update_one.return_value.matched_count = 0
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 404)
        self.assertIn("Task not found", json.loads(response["body"])["error"])

    def test_update_task_extra_field(self):
        event = {
            "headers": {"Authorization": "Bearer validtoken"},
            "pathParameters": {"id": "1"},
            "body": '{"status": "completed", "extra": "oops"}'
        }
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 422)
        self.assertIn("extra is not allowed", json.loads(response["body"])["error"])

if __name__ == "__main__":
    unittest.main()