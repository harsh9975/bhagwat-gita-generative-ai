from beanie import Document, Indexed, before_event, Replace, Insert, Link
from uuid import UUID, uuid4
from pydantic import Field, EmailStr, validator
from datetime import datetime
from typing import Optional
from .user_models import User


class Chat(Document):
    chat_id: UUID = Field(default_factory=uuid4, unique=True)
    title: Indexed(str)
    description: Indexed(str)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    owner: Link[User]

    def __ref__(self) -> str:
        return f"<Chat {self.title}>"

    def __str__(self) -> str:
        return self.title

    def __hash__(self) -> int:
        return hash(self.title)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Chat):
            return self.chat_id == other.chat_id
        return False

    @before_event([Replace, Insert])
    def update_update_at(self):
        self.updated_at = datetime.utcnow()

    @validator("chat_id", pre=True)
    def ensure_uuid(cls, v):
        if isinstance(v, str):
            return UUID(v)
        return v

    class Settings:
        collection_name = "chat"  # Specify the collection name here
