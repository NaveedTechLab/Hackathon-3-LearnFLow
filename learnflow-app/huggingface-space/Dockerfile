FROM python:3.11-slim

WORKDIR /app

# Create non-root user for Hugging Face
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Copy requirements and install
COPY --chown=user:user requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Copy application code
COPY --chown=user:user app/ ./app/

# Hugging Face Spaces uses port 7860
EXPOSE 7860

# Start the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "7860"]
