from fastapi import APIRouter, Depends
from app.schemas.chat_schema import ChatOut, ChatCreate, ChatUpdate
from app.models.user_models import User
from app.api.deps.user_deps import get_current_user
from app.models.chat_models import Chat
from app.services.chat_service import ChatService
from uuid import UUID
from typing import List

chat_router = APIRouter()


@chat_router.get("/", summary="Get all the chats", response_model=List[ChatOut])
async def list(current_user: User = Depends(get_current_user)):
    return await ChatService.list_chats(current_user)


@chat_router.post("/create", summary="create new chat", response_model=Chat)
async def create_chat(data: ChatCreate, current_user: User = Depends(get_current_user)):
    return await ChatService.create_chat(current_user, data)


@chat_router.get("/{chat_id}", summary="get a chat by Id", response_model=ChatOut)
async def retrieve(chat_id: UUID, current_user: User = Depends(get_current_user)):
    return await ChatService.retrieve_chat(current_user, chat_id)


@chat_router.put("/{chat_id}", summary="Update the chat", response_model=ChatOut)
async def update(
    chat_id: UUID, data: ChatUpdate, current_user: User = Depends(get_current_user)
):
    return await ChatService.update_chat(current_user, chat_id, data)


@chat_router.delete("/{chat_id}", summary="Delete Chat")
async def delete(chat_id: UUID, current_user: User = Depends(get_current_user)):
    await ChatService.delete_chat(current_user, chat_id)
    return None
