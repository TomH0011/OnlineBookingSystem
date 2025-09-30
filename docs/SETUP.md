# Online Booking System - Setup Guide

This comprehensive setup guide will help you get the Online Booking System running on your local machine.

## Prerequisites

Before starting, ensure you have the following installed:

- **Java 17+** - [Download here](https://adoptium.net/)
- **Node.js 18+** - [Download here](https://nodejs.org/)
- **Python 3.9+** - [Download here](https://python.org/)
- **MySQL 8.0+** - [Download here](https://dev.mysql.com/downloads/)
- **Git** - [Download here](https://git-scm.com/)

## Environment Variables

Create the following environment files:

### Backend Java (.env)
```bash
# Database
DB_USERNAME=root
DB_PASSWORD=your_mysql_password

# JWT
JWT_SECRET=your_jwt_secret_key_here

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Email
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

# AI Backend
AI_BACKEND_URL=http://localhost:8000
```

### Backend Python (.env)
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_NAME=booking_system

# JWT
JWT_SECRET=your_jwt_secret_key_here

# AI Services
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Java Backend
JAVA_BACKEND_URL=http://localhost:8080/api
```

### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_AI_API_URL=http://localhost:8000
```

## Database Setup

1. **Start MySQL service**
2. **Create database:**
   ```sql
   CREATE DATABASE booking_system;
   ```
3. **Run the schema:**
   ```bash
   mysql -u root -p booking_system < database/schema.sql
   ```

## Backend Setup

### Java Spring Boot Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend-java
   ```

2. **Install dependencies:**
   ```bash
   ./mvnw clean install
   ```

3. **Run the application:**
   ```bash
   ./mvnw spring-boot:run
   ```

   The Java backend will be available at `http://localhost:8080`

### Python FastAPI Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend-python
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   python main.py
   ```

   The Python backend will be available at `http://localhost:8000`

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The React frontend will be available at `http://localhost:3000`

## API Keys Setup

### OpenAI API
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add it to your Python backend `.env` file

### Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Create an account and get your API key
3. Add it to your Python backend `.env` file

### ElevenLabs API
1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Create an account and get your API key
3. Add it to your Python backend `.env` file

### Stripe API
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account and get your API keys
3. Add them to your Java backend configuration

### OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:8080/api/oauth2/callback/google`

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Add authorized redirect URIs:
   - `http://localhost:8080/api/oauth2/callback/facebook`

## Testing the Application

1. **Start all services:**
   - MySQL database
   - Java backend (port 8080)
   - Python backend (port 8000)
   - React frontend (port 3000)

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Java API: http://localhost:8080/api
   - Python API: http://localhost:8000

3. **Test features:**
   - User registration and login
   - OAuth login (Google/Facebook)
   - Create and manage bookings
   - AI chat support
   - Payment processing
   - Admin panel (if admin user)

## Default Admin User

The system comes with a default admin user:
- **Username:** admin
- **Email:** admin@booking.com
- **Password:** admin123
- **Role:** ADMIN

## Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Ensure MySQL is running
   - Check database credentials
   - Verify database exists

2. **Port Already in Use:**
   - Change ports in configuration files
   - Kill processes using the ports

3. **API Key Errors:**
   - Verify all API keys are correct
   - Check API key permissions
   - Ensure services are enabled

4. **CORS Issues:**
   - Check CORS configuration in backend
   - Verify frontend API URLs

### Logs

- **Java Backend:** Check console output
- **Python Backend:** Check console output
- **Frontend:** Check browser console
- **Database:** Check MySQL logs

## Production Deployment

For production deployment:

1. **Use production database**
2. **Set up proper SSL certificates**
3. **Configure production API keys**
4. **Set up reverse proxy (Nginx)**
5. **Use process managers (PM2, systemd)**
6. **Set up monitoring and logging**

## Support

For issues and support:
- Check the logs for error messages
- Verify all services are running
- Ensure all environment variables are set
- Check API key permissions

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Enable HTTPS in production
- Regularly update dependencies
- Monitor for security vulnerabilities
