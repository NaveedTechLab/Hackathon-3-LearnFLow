import os

class Settings:
    APP_NAME: str = os.getenv("APP_NAME", "progress-agent")
    APP_PORT: int = int(os.getenv("APP_PORT", "8006"))
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

settings = Settings()
