import unittest
from unittest.mock import patch
from src.handlers.tasks_handlers.create_task import lambda_handler

class TestCreateTask(unittest.TestCase):
    @patch("src.handlers.tasks_handlers.create_task.get_tasks_collection")
    @patch("src.handlers.tasks_handlers.create_task.verify_token")
    def test_create_task_success(self, mock_verify, mock_db):
        event = {
            "headers": {"Authorization": "Bearer validtoken"},
            "body": '{"title": "Test Task", "description": "Test Desc"}'
        }
        mock_db.return_value.insert_one.return_value = None
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 201)
        body = json.loads(response["body"])
        self.assertIn("id", body)
        self.assertEqual(body["title"], "Test Task")

    def test_create_task_extra_field(self):
        event = {
            "headers": {"Authorization": "Bearer validtoken"},
            "body": '{"title": "Test", "description": "Desc", "extra": "oops"}'
        }
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 422)
        self.assertIn("extra is not allowed", json.loads(response["body"])["error"])

if __name__ == "__main__":
    unittest.main()