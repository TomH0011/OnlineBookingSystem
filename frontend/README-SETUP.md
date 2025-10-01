# Online Booking System - Frontend Setup Guide

This guide will help you set up the frontend development environment on both macOS and Windows.

## 🚨 Important Changes Made

### NextUI → HeroUI Migration
- **NextUI has been deprecated and rebranded as HeroUI**
- All `@nextui-org/react` imports have been updated to `@heroui/react`
- Updated package.json dependencies
- Added proper Tailwind CSS configuration
- Fixed CSS styling and icon sizing issues

## 🛠️ Prerequisites

### macOS
- macOS 10.15 or later
- Terminal access
- Internet connection

### Windows
- Windows 10/11
- Command Prompt or PowerShell
- Internet connection

## 🚀 Quick Setup

### macOS Setup
1. Open Terminal
2. Navigate to the frontend directory:
   ```bash
   cd /path/to/OnlineBookingSystem/frontend
   ```
3. Run the setup script:
   ```bash
   ./setup-macos.sh
   ```

### Windows Setup
1. Open Command Prompt as Administrator
2. Navigate to the frontend directory:
   ```cmd
   cd C:\path\to\OnlineBookingSystem\frontend
   ```
3. Run the setup script:
   ```cmd
   setup-windows.bat
   ```

## 📦 Manual Setup (Alternative)

If the automated scripts don't work, follow these manual steps:

### 1. Install Node.js
- **macOS**: Download from [nodejs.org](https://nodejs.org/) or use Homebrew: `brew install node`
- **Windows**: Download the LTS version from [nodejs.org](https://nodejs.org/)

### 2. Verify Installation
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### 3. Install Dependencies
```bash
# Navigate to frontend directory
cd frontend

# Clean existing dependencies (if any)
rm -rf node_modules package-lock.json  # macOS/Linux
# or
rmdir /s /q node_modules & del package-lock.json  # Windows

# Install dependencies
npm install
```

## 🎯 Running the Application

### Development Server
```bash
npm start
```
This will start the development server on `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## 🔧 Configuration Files Added/Updated

### New Files
- `tailwind.config.js` - Tailwind CSS configuration with HeroUI integration
- `postcss.config.js` - PostCSS configuration for Tailwind
- `setup-macos.sh` - macOS setup script
- `setup-windows.bat` - Windows setup script

### Updated Files
- `package.json` - Updated dependencies (NextUI → HeroUI)
- `src/index.js` - Updated provider (NextUIProvider → HeroUIProvider)
- `src/index.css` - Added HeroUI styles and CSS variables
- All component files - Updated imports from NextUI to HeroUI

## 🎨 Styling and Theming

The application now uses:
- **HeroUI** (rebranded NextUI) for UI components
- **Tailwind CSS** for utility classes
- **CSS Variables** for theming
- **Dark/Light mode** support

### Theme Colors
- Primary: Blue (#3b82f6)
- Secondary: Gray (#64748b)
- Success: Green (#22c55e)
- Warning: Orange (#f59e0b)
- Danger: Red (#ef4444)

## 🐛 Troubleshooting

### Common Issues

#### 1. Node.js Not Found
**macOS**: Install using Homebrew or download from nodejs.org
**Windows**: Download and install the LTS version from nodejs.org

#### 2. Permission Denied (macOS)
```bash
chmod +x setup-macos.sh
```

#### 3. Dependencies Installation Fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 4. CSS Not Loading
- Ensure Tailwind CSS is properly configured
- Check that HeroUI styles are imported in `index.css`
- Verify PostCSS configuration

#### 5. Icons Too Large
- CSS rules have been added to fix icon sizing
- Icons should now display at proper sizes (max 24px)

### Development Server Issues

#### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
netstat -ano | findstr :3000    # Windows (then kill PID)
```

#### Hot Reload Not Working
- Ensure you're using the latest version of react-scripts
- Check for any console errors
- Try restarting the development server

## 🔄 Cross-Platform Development

### File Paths
- Use forward slashes (`/`) in import paths
- Avoid hardcoded paths
- Use environment variables for configuration

### Scripts
- Both macOS and Windows setup scripts are provided
- Use npm scripts for cross-platform commands
- Avoid OS-specific commands in package.json

## 📚 Additional Resources

- [HeroUI Documentation](https://heroui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🆘 Getting Help

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Check the console for error messages
4. Ensure backend services are running
5. Try the manual setup steps

## 🎉 Success!

Once setup is complete, you should be able to:
- Run `npm start` without errors
- See the application with proper styling
- Have icons display at correct sizes
- Switch between light and dark themes
- Use all HeroUI components properly

Happy coding! 🚀
