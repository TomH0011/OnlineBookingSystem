# Environment Setup Guide

## 🔐 Creating Your Environment Files

### Step 1: Copy the Template Files

You need to create `.env` files in each backend directory. Here's how:

#### For Java Backend:
```bash
# Navigate to backend-java directory
cd backend-java

# Copy the template file
cp env-template .env

# Edit the .env file with your actual credentials
```

#### For Python Backend:
```bash
# Navigate to backend-python directory
cd backend-python

# Copy the template file
cp env-template .env

# Edit the .env file with your actual credentials
```

#### For Frontend:
```bash
# Navigate to frontend directory
cd frontend

# Copy the template file
cp env-template .env

# Edit the .env file with your actual credentials
```

### Step 2: Configure Your Credentials

#### Java Backend (.env)
```bash
# Database Configuration
DB_USERNAME=root
DB_PASSWORD=your_actual_mysql_password

# JWT Secret - CHANGE THIS TO A SECURE RANDOM STRING
JWT_SECRET=mySecretKey123456789012345678901234567890

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key

# OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret
FACEBOOK_CLIENT_ID=your_actual_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_actual_facebook_client_secret

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your_actual_email@gmail.com
MAIL_PASSWORD=your_actual_app_password

# AI Backend URL
AI_BACKEND_URL=http://localhost:8000
```

#### Python Backend (.env)
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_actual_mysql_password
DB_NAME=booking_system

# JWT Secret (same as Java backend)
JWT_SECRET=mySecretKey123456789012345678901234567890

# AI Services
OPENAI_API_KEY=sk-proj-your_actual_openai_api_key
GEMINI_API_KEY=AIzaSy-your_actual_gemini_api_key
ELEVENLABS_API_KEY=sk_your_actual_elevenlabs_api_key

# Java Backend URL
JAVA_BACKEND_URL=http://localhost:8080/api
```

#### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_AI_API_URL=http://localhost:8000
```

## 🔑 Getting Your API Keys

### 1. MySQL Database
- Install MySQL 8.0+
- Create a database named `booking_system`
- Note your root password

### 2. Stripe API Keys
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account
3. Go to "Developers" → "API Keys"
4. Copy your "Publishable key" and "Secret key"

### 3. OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account
3. Go to "API Keys" section
4. Create a new API key

### 4. Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Create an account
3. Get your API key

### 5. ElevenLabs API Key
1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Create an account
3. Go to "Profile" → "API Keys"
4. Create a new API key

### 6. Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:8080/api/oauth2/callback/google`

### 7. Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add "Facebook Login" product
4. Add authorized redirect URI: `http://localhost:8080/api/oauth2/callback/facebook`

## 🛡️ Security Notes

### Important Security Practices:
1. **Never commit .env files to git** - They're already in .gitignore
2. **Use different keys for development and production**
3. **Rotate your keys regularly**
4. **Use strong, unique passwords**
5. **Enable 2FA on all service accounts**

### Environment File Security:
- The `.env` files are already added to `.gitignore`
- Template files (`env-template`) are safe to commit
- Never share your actual `.env` files
- Use environment variables in production

## 🚀 Quick Start Commands

### 1. Create Environment Files
```bash
# Java Backend
cd backend-java
cp env-template .env
# Edit .env with your credentials

# Python Backend
cd backend-python
cp env-template .env
# Edit .env with your credentials

# Frontend
cd frontend
cp env-template .env
# Edit .env with your credentials
```

### 2. Start the Services
```bash
# Start MySQL
sudo systemctl start mysql

# Start Java Backend
cd backend-java
./mvnw spring-boot:run

# Start Python Backend (in new terminal)
cd backend-python
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py

# Start Frontend (in new terminal)
cd frontend
npm install
npm start
```

## 🔧 Troubleshooting

### Common Issues:
1. **"Environment variable not found"** - Check your .env file exists and has correct variable names
2. **"Database connection failed"** - Verify MySQL is running and credentials are correct
3. **"API key invalid"** - Double-check your API keys are correct and active
4. **"Port already in use"** - Change ports in configuration or kill existing processes

### Verification:
- Java Backend: http://localhost:8080/api
- Python Backend: http://localhost:8000
- Frontend: http://localhost:3000
- Database: localhost:3306

## 📝 Example Working Configuration

Here's an example of what your `.env` files should look like with placeholder values:

### backend-java/.env
```bash
DB_USERNAME=root
DB_PASSWORD=mySecurePassword123
JWT_SECRET=mySuperSecretJWTKey123456789012345678901234567890
STRIPE_SECRET_KEY=sk_test_51ABC123def456ghi789jkl012mno345pqr678stu901vwx234yz567
STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123def456ghi789jkl012mno345pqr678stu901vwx234yz567
GOOGLE_CLIENT_ID=123456789-abc123def456ghi789.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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45pqr678stu901vwx234yz567
FACEBOOK_CLIENT_ID=123456789012345
FACEBOOK_CLIENT_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
AI_BACKEND_URL=http://localhost:8000
```

Remember to replace all placeholder values with your actual credentials!
