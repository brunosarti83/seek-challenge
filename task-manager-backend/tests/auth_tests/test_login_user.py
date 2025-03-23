import unittest
from unittest.mock import patch
from src.handlers.auth_handlers.login_user import lambda_handler
import json
import os

class TestLoginUser(unittest.TestCase):
    @patch("src.handlers.auth_handlers.login_user.get_users_collection")
    def test_login_user_success(self, mock_db):
        mock_db.return_value.find_one.return_value = {
            "user_id": "123",
            "email": "user@example.com",
            "password": "$2b$12$Kix...hashedpassword..."
        }
        event = {"body": '{"email": "user@example.com", "password": "securepass123"}'}
        with patch("src.handlers.auth_handlers.login_user.verify_password", return_value=True):
            response = lambda_handler(event, None)
            self.assertEqual(response["statusCode"], 200)
            body = json.loads(response["body"])
            self.assertIn("token", body)