import os

class Settings:
    APP_NAME: str = os.getenv("APP_NAME", "debug-agent")
    APP_PORT: int = int(os.getenv("APP_PORT", "8004"))
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

settings = Settings()
