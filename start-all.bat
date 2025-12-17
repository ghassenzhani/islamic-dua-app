@echo off
echo ========================================
echo Starting Islamic Dua App Servers
echo ========================================
echo.

echo [1/3] Starting MongoDB Service...
echo.
echo ⚠️  IMPORTANT: This script needs to run as Administrator to start MongoDB
echo.
net start MongoDB >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ MongoDB service started successfully
) else (
    echo.
    echo ❌ Failed to start MongoDB service
    echo.
    echo Please do ONE of the following:
    echo.
    echo Option 1: Run this script as Administrator
    echo    - Right-click start-all.bat
    echo    - Select "Run as administrator"
    echo.
    echo Option 2: Start MongoDB manually
    echo    - Press Windows + R
    echo    - Type: services.msc
    echo    - Find "MongoDB Server (MongoDB)"
    echo    - Right-click → Start
    echo.
    echo Option 3: Use MongoDB Atlas (Cloud)
    echo    - See MONGODB_SETUP.md for instructions
    echo.
    pause
    exit /b 1
)
timeout /t 3 >nul

echo.
echo [2/3] Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 3 >nul

echo.
echo [3/3] Starting Frontend...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm start"

echo.
echo ========================================
echo ✅ All servers are starting...
echo ========================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul

