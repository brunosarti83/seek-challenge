from pydantic import BaseModel, Field

class TaskCreate(BaseModel):
    title: str
    description: str
    status: str = Field(default="todo", pattern="^(todo|in_progress|completed)$")

    class Config:
        extra = "forbid"

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    status: str | None = Field(default=None, pattern="^(todo|in_progress|completed)$")

    class Config:
        extra = "forbid"

class Task(TaskCreate):
    id: str