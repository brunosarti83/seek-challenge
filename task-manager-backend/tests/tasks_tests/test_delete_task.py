import unittest
from unittest.mock import patch
from src.handlers.tasks_handlers.delete_task import lambda_handler
import json

class TestDeleteTask(unittest.TestCase):
    @patch("src.handlers.tasks_handlers.delete_task.get_tasks_collection")
    @patch("src.handlers.tasks_handlers.delete_task.verify_token")  
    def test_delete_task_success(self, mock_verify, mock_db):
        mock_verify.return_value = "fake-user-id" 
        event = {
            "headers": {"Authorization": "Bearer validtoken"},
            "pathParameters": {"id": "1"}
        }
        mock_db.return_value.delete_one.return_value.deleted_count = 1
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 204)
        self.assertEqual(response["body"], "") 

    @patch("src.handlers.tasks_handlers.delete_task.get_tasks_collection")
    @patch("src.handlers.tasks_handlers.delete_task.verify_token")   
    def test_delete_task_not_found(self, mock_verify, mock_db):
        mock_verify.return_value = "fake-user-id" 
        event = {
            "headers": {"Authorization": "Bearer validtoken"},
            "pathParameters": {"id": "999"}
        }
        mock_db.return_value.delete_one.return_value.deleted_count = 0
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 404)
        self.assertIn("Task not found", json.loads(response["body"])["error"])

    @patch("src.handlers.tasks_handlers.delete_task.verify_token")  
    def test_delete_task_unauthorized(self, mock_verify):
        mock_verify.side_effect = Exception("Unauthorized: Invalid token")
        event = {
            "headers": {"Authorization": "Bearer invalidtoken"},
            "pathParameters": {"id": "1"}
        }
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 401)
        self.assertIn("Unauthorized", json.loads(response["body"])["error"])

if __name__ == "__main__":
    unittest.main()