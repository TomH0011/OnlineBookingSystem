from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import Optional, List
import os
from dotenv import load_dotenv
import logging

from services.ai_service import AIService
from services.voice_service import VoiceService
from services.database_service import DatabaseService
from models.chat_models import ChatRequest, ChatResponse, VoiceRequest, VoiceResponse
from utils.auth import verify_token

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="AI Chatbot Service",
    description="AI-powered customer support chatbot with voice capabilities",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Initialize services
ai_service = AIService()
voice_service = VoiceService()
database_service = DatabaseService()

@app.get("/")
async def root():
    return {"message": "AI Chatbot Service is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ai-chatbot"}

@app.post("/chat", response_model=ChatResponse)
async def chat_with_ai(
    request: ChatRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    Chat with AI chatbot
    """
    try:
        # Verify JWT token
        user_data = verify_token(credentials.credentials)
        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )
        
        # Get AI response
        ai_response = await ai_service.get_response(
            message=request.message,
            report_id=request.report_id,
            user_id=user_data.get("user_id"),
            conversation_history=request.conversation_history
        )
        
        # Store conversation in database
        await database_service.store_conversation(
            report_id=request.report_id,
            user_id=user_data.get("user_id"),
            user_message=request.message,
            ai_response=ai_response
        )
        
        return ChatResponse(
            response=ai_response,
            report_id=request.report_id,
            timestamp=ai_service.get_current_timestamp()
        )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error"
        )

@app.post("/voice/convert", response_model=VoiceResponse)
async def convert_text_to_speech(
    request: VoiceRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    Convert text to speech using 11labs with British accents
    """
    try:
        # Verify JWT token
        user_data = verify_token(credentials.credentials)
        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )
        
        # Generate voice
        audio_url = await voice_service.text_to_speech(
            text=request.text,
            voice_id=request.voice_id,
            accent=request.accent
        )
        
        return VoiceResponse(
            audio_url=audio_url,
            voice_id=request.voice_id,
            accent=request.accent
        )
        
    except Exception as e:
        logger.error(f"Error in voice conversion: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error converting text to speech"
        )

@app.get("/voices")
async def get_available_voices():
    """
    Get list of available British voices
    """
    try:
        voices = await voice_service.get_british_voices()
        return {"voices": voices}
    except Exception as e:
        logger.error(f"Error getting voices: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving voices"
        )

@app.get("/chat/{report_id}/history")
async def get_chat_history(
    report_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    Get chat history for a specific report
    """
    try:
        # Verify JWT token
        user_data = verify_token(credentials.credentials)
        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )
        
        # Get chat history
        history = await database_service.get_chat_history(report_id)
        return {"history": history}
        
    except Exception as e:
        logger.error(f"Error getting chat history: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving chat history"
        )

@app.post("/chat/{report_id}/escalate")
async def escalate_chat(
    report_id: str,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    Escalate chat to human support
    """
    try:
        # Verify JWT token
        user_data = verify_token(credentials.credentials)
        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )
        
        # Escalate chat
        await database_service.escalate_chat(report_id)
        return {"message": "Chat escalated successfully"}
        
    except Exception as e:
        logger.error(f"Error escalating chat: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error escalating chat"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
