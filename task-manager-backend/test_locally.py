import json
from src.handlers.auth_handlers.register_user import lambda_handler as register_handler
from src.handlers.auth_handlers.login_user import lambda_handler as login_handler
from src.handlers.tasks_handlers.get_tasks import lambda_handler as get_tasks_handler
from src.handlers.tasks_handlers.create_task import lambda_handler as create_task_handler
from src.handlers.tasks_handlers.update_task import lambda_handler as update_task_handler
from src.handlers.tasks_handlers.delete_task import lambda_handler as delete_task_handler

def run_test(name, handler, event):
    print(f"\nTesting {name}...")
    response = handler(event, None)
    print(f"Status Code: {response['statusCode']}")
    print(f"Body: {response.get('body', '')}")
    return response

def main():
    # Step 1: Register a user
    register_event = {
        "body": json.dumps({
            "email": "testuser@example.com",
            "password": "securepass123"
        })
    }
    register_response = run_test("Register User", register_handler, register_event)
    if register_response["statusCode"] != 201:
        print("Registration failed, aborting.")
        return
    token = json.loads(register_response["body"])["token"]

    # Step 2: Login to verify credentials and get token
    login_event = {
        "body": json.dumps({
            "email": "testuser@example.com",
            "password": "securepass123"
        })
    }
    login_response = run_test("Login User", login_handler, login_event)
    if login_response["statusCode"] != 200:
        print("Login failed, aborting.")
        return
    token = json.loads(login_response["body"])["token"]  # Use this token for consistency

    # Headers with JWT for authenticated requests
    headers = {"Authorization": f"Bearer {token}"}

    # Step 3: Create a task
    create_event = {
        "headers": headers,
        "body": json.dumps({
            "title": "Test Task",
            "description": "This is a test task",
            "status": "todo"
        })
    }
    create_response = run_test("Create Task", create_task_handler, create_event)
    if create_response["statusCode"] != 201:
        print("Task creation failed, aborting.")
        return
    task_id = json.loads(create_response["body"])["id"]

    # Step 4: Get all tasks
    get_tasks_event = {"headers": headers}
    run_test("Get Tasks", get_tasks_handler, get_tasks_event)

    # Step 5: Update the task
    update_event = {
        "headers": headers,
        "pathParameters": {"id": task_id},
        "body": json.dumps({
            "status": "completed"
        })
    }
    run_test("Update Task", update_task_handler, update_event)

    # Step 6: Delete the task
    delete_event = {
        "headers": headers,
        "pathParameters": {"id": task_id}
    }
    run_test("Delete Task", delete_task_handler, delete_event)

    print("\nAll tests completed successfully!")

if __name__ == "__main__":
    main()