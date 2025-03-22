import unittest
from unittest.mock import patch
from src.handlers.auth_handlers.register_user import lambda_handler
import json

class TestRegisterUser(unittest.TestCase):
    @patch("src.handlers.auth_handlers.register_user.get_users_collection")
    def test_register_user_success(self, mock_db):
        mock_db.return_value.find_one.return_value = None  # Email doesn't exist
        mock_db.return_value.insert_one.return_value = None
        event = {"body": '{"email": "user@example.com", "password": "securepass123"}'}
        response = lambda_handler(event, None)
        self.assertEqual(response["statusCode"], 201)
        body = json.loads(response["body"])
        self.assertIn("token", body)
        self.assertEqual(body["user"]["email"], "user@example.com")