import os

class Settings:
    APP_NAME: str = os.getenv("APP_NAME", "concepts-agent")
    APP_PORT: int = int(os.getenv("APP_PORT", "8002"))
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

settings = Settings()
