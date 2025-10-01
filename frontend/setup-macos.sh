#!/bin/bash

# Online Booking System - macOS Setup Script
# This script sets up the development environment on macOS

echo "🚀 Setting up Online Booking System on macOS..."

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "✅ Homebrew is already installed"
fi

# Install Node.js using Homebrew
echo "📦 Installing Node.js..."
brew install node

# Verify Node.js installation
echo "🔍 Verifying Node.js installation..."
node --version
npm --version

# Navigate to frontend directory
cd "$(dirname "$0")"

# Clean any existing node_modules and package-lock.json
echo "🧹 Cleaning existing dependencies..."
rm -rf node_modules package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for any installation errors
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🎉 Setup complete! You can now run:"
    echo "   npm start    - Start the development server"
    echo "   npm build    - Build for production"
    echo "   npm test     - Run tests"
    echo ""
    echo "📝 Note: Make sure your backend services are running before starting the frontend."
else
    echo "❌ Error installing dependencies. Please check the error messages above."
    exit 1
fi
