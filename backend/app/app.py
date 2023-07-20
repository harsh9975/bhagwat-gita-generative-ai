from fastapi import FastAPI
from app.core.config import settings
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from app.models.user_models import User
from app.models.chat_models import Chat
from app.models.chat_respone_models import ChatResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.api_v1.router import router

app = FastAPI(
    title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Add CORS Middleware to allow requests from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def app_init():
    """
    Initialise crucial application services
    """

    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING)
    database = db_client.get_database(
        settings.MONGO_DATABASE_NAME
    )  # Provide the database name here

    await init_beanie(database=database, document_models=[User, Chat, ChatResponse])


app.include_router(router, prefix=settings.API_V1_STR)
