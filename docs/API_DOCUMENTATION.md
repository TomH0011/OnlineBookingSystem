# API Documentation

## Java Spring Boot Backend API

Base URL: `http://localhost:8080/api`

### Authentication Endpoints

#### POST /auth/signin
Login with username and password.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "tokenType": "Bearer",
  "id": 1,
  "username": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "CUSTOMER|BUSINESS|ADMIN",
  "customerSupportId": "string",
  "roles": ["ROLE_CUSTOMER"]
}
```

#### POST /auth/signup
Register a new user.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "role": "CUSTOMER|BUSINESS|ADMIN"
}
```

#### POST /auth/signout
Logout user.

### Booking Endpoints

#### POST /booking/create
Create a new booking.

**Request Body:**
```json
{
  "bookingDateTime": "2024-01-15T10:00:00",
  "durationMinutes": 60,
  "serviceName": "Consultation",
  "serviceDescription": "Initial consultation",
  "price": 150.00,
  "notes": "Optional notes"
}
```

#### GET /booking/my-bookings
Get user's bookings.

#### GET /booking/my-bookings/{status}
Get user's bookings by status.

#### PUT /booking/{id}/cancel
Cancel a booking.

#### PUT /booking/{id}/reschedule
Reschedule a booking.

**Request Body:**
```json
{
  "newDateTime": "2024-01-16T14:00:00"
}
```

### Chat Endpoints

#### POST /chat/start
Start a new chat session.

#### GET /chat/sessions
Get user's chat sessions.

#### GET /chat/sessions/{reportId}/messages
Get messages for a chat session.

#### POST /chat/sessions/{reportId}/send
Send a message in chat.

**Request Body:**
```json
{
  "content": "Hello, I need help with my booking"
}
```

#### POST /chat/sessions/{reportId}/close
Close a chat session.

### Payment Endpoints

#### POST /stripe/create-payment-intent
Create a Stripe payment intent.

**Request Body:**
```json
{
  "amount": 150.00,
  "currency": "usd",
  "description": "Consultation booking"
}
```

#### POST /stripe/confirm-payment
Confirm a payment.

#### GET /stripe/payment-status
Get payment status.

## Python FastAPI Backend API

Base URL: `http://localhost:8000`

### Chat Endpoints

#### POST /chat
Chat with AI assistant.

**Request Body:**
```json
{
  "message": "string",
  "report_id": "string",
  "conversation_history": [
    {
      "role": "user|assistant",
      "content": "string"
    }
  ]
}
```

**Response:**
```json
{
  "response": "string",
  "report_id": "string",
  "timestamp": "2024-01-15T10:00:00"
}
```

### Voice Endpoints

#### POST /voice/convert
Convert text to speech.

**Request Body:**
```json
{
  "text": "Hello, how can I help you?",
  "voice_id": "optional_voice_id",
  "accent": "british"
}
```

**Response:**
```json
{
  "audio_url": "string",
  "voice_id": "string",
  "accent": "british"
}
```

#### GET /voices
Get available British voices.

**Response:**
```json
{
  "voices": [
    {
      "id": "male_british_1",
      "voice_id": "pNInz6obpgDQGcFmaJgB",
      "name": "Adam",
      "accent": "British",
      "gender": "Male"
    }
  ]
}
```

### Chat History Endpoints

#### GET /chat/{report_id}/history
Get chat history for a report.

#### POST /chat/{report_id}/escalate
Escalate chat to human support.

## Authentication

All endpoints (except auth endpoints) require JWT authentication.

**Header:**
```
Authorization: Bearer <jwt_token>
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-15T10:00:00"
}
```

## Rate Limiting

- Chat endpoints: 100 requests per minute
- Payment endpoints: 50 requests per minute
- Other endpoints: 200 requests per minute

## Webhooks

### Stripe Webhooks

The system supports Stripe webhooks for payment events:

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `payment_intent.canceled`

**Endpoint:** `POST /api/stripe/webhook`

## Security

- All API keys are stored securely
- JWT tokens expire after 24 hours
- CORS is configured for frontend domain
- Input validation on all endpoints
- SQL injection protection
- XSS protection

## Testing

Use the following tools to test the API:

- **Postman** - Import the provided collection
- **curl** - Command line testing
- **Frontend** - Built-in API testing

### Example curl commands:

```bash
# Login
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Create booking
curl -X POST http://localhost:8080/api/booking/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"bookingDateTime":"2024-01-15T10:00:00","durationMinutes":60,"serviceName":"Consultation","price":150.00}'

# Chat with AI
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"message":"Hello","report_id":"1234567"}'
```
