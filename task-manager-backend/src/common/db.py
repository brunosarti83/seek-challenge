from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

def get_db():
    client = MongoClient(os.environ["MONGO_URI"])
    return client["taskdb"]

def get_tasks_collection():
    db = get_db()
    return db["tasks"]

def get_users_collection():
    db = get_db()
    return db["users"]