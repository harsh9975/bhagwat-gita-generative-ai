from typing import List
from app.models.user_models import User
from app.models.chat_models import Chat
from app.schemas.chat_schema import ChatCreate, ChatUpdate
from uuid import UUID
from fastapi import HTTPException

# from pydantic import types
# from pydantic import mongodb

# PydanticObjectId = mongodb.PydanticObjectId


class ChatService:
    @staticmethod
    async def list_chats(user: User) -> List[Chat]:
        chats = await Chat.find(Chat.owner.id == user.id).to_list()

        return chats

    @staticmethod
    async def create_chat(user: User, data: ChatCreate) -> Chat:
        chat = Chat(**data.dict(), owner=user)
        return await chat.insert()

    @staticmethod
    async def retrieve_chat(current_user: User, chat_id: UUID):
        chat = await Chat.find_one(
            Chat.chat_id == chat_id, Chat.owner.id == current_user.id
        )
        return chat

    @staticmethod
    async def update_chat(current_user: User, chat_id: UUID, data: ChatUpdate):
        chat = await ChatService.retrieve_chat(current_user, chat_id)
        await chat.update({"$set": data.dict(exclude_unset=True)})

        await chat.save()
        return chat

    @staticmethod
    async def delete_chat(current_user: User, chat_id: UUID):
        chat = await ChatService.retrieve_chat(current_user, chat_id)
        if chat:
            await chat.delete()

        return None

    @staticmethod
    async def get_chat_by_id(chat_id: UUID) -> Chat:
        """
        Get a chat by chat_id
        """
        print("UUID", chat_id)
        chat = await Chat.get(chat_id)
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")
        return chat
