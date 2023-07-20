from beanie import Document, Indexed, before_event, Replace, Link
from uuid import UUID, uuid4
from pydantic import Field
from datetime import datetime
from typing import Optional
from .user_models import User
from .chat_models import Chat  # Import the Chat model from the previous code snippet


class ChatResponse(Document):
    response_id: UUID = Field(default_factory=uuid4, unique=True)
    chat: Link[Chat]  # Link to the original Chat model
    user_id: UUID  # You may store the user's ID here
    prompt: Indexed(str)  # The user's message
    ai_response: Indexed(str)  # The AI model's response to the prompt
    created_at: datetime = Field(default_factory=datetime.utcnow)

    def __ref__(self) -> str:
        return f"<ChatResponse {self.prompt}>"

    def __str__(self) -> str:
        return self.prompt

    def __hash__(self) -> int:
        return hash(self.prompt)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Chat):
            return self.response_id == other.response_id
        return False

    @before_event([Replace])
    def update_create_at(self):
        self.created_at = datetime.utcnow()

    class Settings:
        collection_name = "response"  # Specify the collection name here
