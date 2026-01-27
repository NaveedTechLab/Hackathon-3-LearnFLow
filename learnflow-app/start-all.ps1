# LearnFlow - Start All Services (PowerShell)
# Run this script to start all backend services and frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  LearnFlow - Starting All Services    " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$BASE_PATH = $PSScriptRoot

# Check if virtual environment exists
if (-not (Test-Path "$BASE_PATH\venv")) {
    Write-Host "`nCreating virtual environment..." -ForegroundColor Yellow
    python -m venv "$BASE_PATH\venv"
}

# Activate virtual environment and install dependencies
Write-Host "`nInstalling Python dependencies..." -ForegroundColor Yellow
& "$BASE_PATH\venv\Scripts\Activate.ps1"
pip install fastapi uvicorn pydantic httpx python-jose PyJWT python-multipart --quiet

# Start API Gateway (Port 8000)
Write-Host "`nStarting API Gateway on port 8000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BASE_PATH'; .\venv\Scripts\Activate.ps1; cd services\api-gateway; python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

# Wait a bit for API Gateway to start
Start-Sleep -Seconds 2

# Start Triage Agent (Port 8001)
Write-Host "Starting Triage Agent on port 8001..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BASE_PATH'; .\venv\Scripts\Activate.ps1; cd services\triage-agent; python -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload"

# Start Concepts Agent (Port 8002)
Write-Host "Starting Concepts Agent on port 8002..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BASE_PATH'; .\venv\Scripts\Activate.ps1; cd services\concepts-agent; python -m uvicorn app.main:app --host 0.0.0.0 --port 8002 --reload"

# Start Exercise Agent (Port 8005)
Write-Host "Starting Exercise Agent on port 8005..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BASE_PATH'; .\venv\Scripts\Activate.ps1; cd services\exercise-agent; python -m uvicorn app.main:app --host 0.0.0.0 --port 8005 --reload"

# Start Frontend (Port 3000)
Write-Host "`nStarting Frontend on port 3000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$BASE_PATH\frontend'; npm run dev"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  All Services Started!                " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nServices Running:" -ForegroundColor White
Write-Host "  - API Gateway:    http://localhost:8000" -ForegroundColor Gray
Write-Host "  - API Docs:       http://localhost:8000/docs" -ForegroundColor Gray
Write-Host "  - Triage Agent:   http://localhost:8001" -ForegroundColor Gray
Write-Host "  - Concepts Agent: http://localhost:8002" -ForegroundColor Gray
Write-Host "  - Exercise Agent: http://localhost:8005" -ForegroundColor Gray
Write-Host "  - Frontend:       http://localhost:3000" -ForegroundColor Gray
Write-Host "`nOpen http://localhost:3000 in your browser!" -ForegroundColor Yellow
