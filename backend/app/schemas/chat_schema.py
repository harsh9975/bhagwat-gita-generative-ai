from pydantic import BaseModel, Field
from datetime import datetime
from uuid import UUID
from typing import Optional


class ChatCreate(BaseModel):
    title: str = Field(..., title="Title", max_length=100, min_length=1)
    description: str = Field(..., title="Title", max_length=755, min_length=1)


class ChatUpdate(BaseModel):
    title: Optional[str] = Field(..., title="Title", max_length=100, min_length=1)
    description: Optional[str] = Field(..., title="Title", max_length=755, min_length=1)


class ChatOut(BaseModel):
    chat_id: UUID
    title: str
    description: str
    created_at: datetime
    updated_at: datetime
