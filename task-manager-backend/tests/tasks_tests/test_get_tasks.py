import unittest
from unittest.mock import patch
from src.handlers.tasks_handlers.get_tasks import lambda_handler
import json
import os

class TestGetTasks(unittest.TestCase):
    @patch("src.handlers.tasks_handlers.get_tasks.get_tasks_collection")
    @patch("src.handlers.tasks_handlers.get_tasks.verify_token")
    def test_get_tasks_success(self, mock_verify, mock_db):
        mock_verify.return_value = "fake-user-id"
        mock_db.return_value.find.return_value = [
            {"id": "1", "title": "Task 1", "description": "Desc 1", "status": "todo"},
            {"id": "2", "title": "Task 2", "description": "Desc 2", "status": "in_progress"}
        ]
        event = {"headers": {"Authorization": "Bearer validtoken"}}
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 200)
        body = json.loads(response["body"])
        self.assertEqual(len(body), 2)
        self.assertEqual(body[0]["id"], "1")
        self.assertEqual(body[1]["title"], "Task 2")

    @patch("src.handlers.tasks_handlers.get_tasks.verify_token")
    def test_get_tasks_unauthorized(self, mock_verify):
        mock_verify.side_effect = Exception("Unauthorized: Invalid token")
        event = {"headers": {"Authorization": "Bearer invalidtoken"}}
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 401)
        self.assertIn("Unauthorized", json.loads(response["body"])["error"])

if __name__ == "__main__":
    unittest.main()