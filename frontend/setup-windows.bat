@echo off
REM Online Booking System - Windows Setup Script
REM This script sets up the development environment on Windows

echo 🚀 Setting up Online Booking System on Windows...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    echo 📦 Download the LTS version for Windows
    echo 🔄 After installation, restart your command prompt and run this script again.
    pause
    exit /b 1
) else (
    echo ✅ Node.js is installed
    node --version
    npm --version
)

REM Navigate to the script directory
cd /d "%~dp0"

REM Clean any existing node_modules and package-lock.json
echo 🧹 Cleaning existing dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Check for any installation errors
if %errorlevel% equ 0 (
    echo ✅ Dependencies installed successfully!
    echo.
    echo 🎉 Setup complete! You can now run:
    echo    npm start    - Start the development server
    echo    npm build    - Build for production
    echo    npm test     - Run tests
    echo.
    echo 📝 Note: Make sure your backend services are running before starting the frontend.
) else (
    echo ❌ Error installing dependencies. Please check the error messages above.
    pause
    exit /b 1
)

pause
