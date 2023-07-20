from fastapi import APIRouter
from app.api.api_v1.handlers import user
from app.api.auth.jwt import auth_router
from app.api.api_v1.handlers import chat

# from app.api.api_v1.handlers import chat_repsonse

router = APIRouter()
router.include_router(user.user_router, prefix="/users", tags=["users"])
router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(chat.chat_router, prefix="/chat", tags=["chat"])
# router.include_router(
#     chat_repsonse.chat_response_router, prefix="/chat-response", tags=["chat-response"]
# )
