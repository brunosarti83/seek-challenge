from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)

    class Config:
        extra = "forbid"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        extra = "forbid"

class User(BaseModel):
    user_id: str
    email: EmailStr