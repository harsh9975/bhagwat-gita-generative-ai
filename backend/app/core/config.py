from typing import List
from pydantic import AnyHttpUrl, BaseSettings

# from pydantic_settings import BaseSettings
from decouple import config


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", cast=str)
    JWT_REFRESH_SECRET_KEY: str = config("JWT_REFRESH_SECRET_KEY", cast=str)
    ALGORITHMS: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7days
    BACKEND_CORS_ORIGIN: List[AnyHttpUrl] = list()
    PROJECT_NAME: str = "Bhagwat Gita Gen AI"

    # Database
    MONGO_CONNECTION_STRING: str = config("MONGO_CONNECTION_STRING", cast=str)
    MONGO_DATABASE_NAME: str = config("MONGO_DATABASE_NAME", cast=str)

    class Config:
        case_sensitive: True


settings = Settings()
