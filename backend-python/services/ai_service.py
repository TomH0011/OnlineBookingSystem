import openai
import google.generativeai as genai
import os
import logging
from typing import Optional, List, Dict, Any
from datetime import datetime
import asyncio
import httpx

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        # Initialize OpenAI
        openai.api_key = os.getenv("OPENAI_API_KEY")
        
        # Initialize Gemini
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.gemini_model = genai.GenerativeModel('gemini-pro')
        
        # System prompt for customer support
        self.system_prompt = """
        You are a helpful customer support assistant for an online booking system. 
        You help customers with:
        - Booking appointments and services
        - Rescheduling or cancelling bookings
        - Payment issues
        - General inquiries about services
        - Technical support
        
        Always be polite, professional, and helpful. If you cannot resolve an issue, 
        offer to escalate to human support. Use British English and be friendly but professional.
        
        Important: Never provide personal information about other users or internal system details.
        If asked about specific user data, politely decline and offer to help with general questions.
        """
        
        # Conversation context
        self.conversation_contexts = {}
    
    async def get_response(self, message: str, report_id: str, user_id: Optional[int] = None, 
                          conversation_history: Optional[List[Dict[str, str]]] = None) -> str:
        """
        Get AI response with fallback from ChatGPT to Gemini
        """
        try:
            # Try ChatGPT first
            response = await self._get_chatgpt_response(message, conversation_history)
            if response:
                return response
        except Exception as e:
            logger.warning(f"ChatGPT failed: {str(e)}")
        
        try:
            # Fallback to Gemini
            response = await self._get_gemini_response(message, conversation_history)
            if response:
                return response
        except Exception as e:
            logger.warning(f"Gemini failed: {str(e)}")
        
        # Final fallback
        return self._get_fallback_response()
    
    async def _get_chatgpt_response(self, message: str, conversation_history: Optional[List[Dict[str, str]]] = None) -> Optional[str]:
        """
        Get response from ChatGPT
        """
        try:
            # Prepare messages
            messages = [{"role": "system", "content": self.system_prompt}]
            
            # Add conversation history if provided
            if conversation_history:
                for msg in conversation_history:
                    messages.append({
                        "role": msg.get("role", "user"),
                        "content": msg.get("content", "")
                    })
            
            # Add current message
            messages.append({"role": "user", "content": message})
            
            # Make API call
            response = await openai.ChatCompletion.acreate(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
            
        except Exception as e:
            logger.error(f"ChatGPT API error: {str(e)}")
            raise e
    
    async def _get_gemini_response(self, message: str, conversation_history: Optional[List[Dict[str, str]]] = None) -> Optional[str]:
        """
        Get response from Gemini
        """
        try:
            # Prepare conversation context
            context = self.system_prompt + "\n\n"
            
            if conversation_history:
                for msg in conversation_history:
                    role = msg.get("role", "user")
                    content = msg.get("content", "")
                    if role == "user":
                        context += f"User: {content}\n"
                    elif role == "assistant":
                        context += f"Assistant: {content}\n"
            
            context += f"User: {message}\nAssistant:"
            
            # Generate response
            response = await self.gemini_model.generate_content_async(context)
            return response.text.strip()
            
        except Exception as e:
            logger.error(f"Gemini API error: {str(e)}")
            raise e
    
    def _get_fallback_response(self) -> str:
        """
        Fallback response when all AI services fail
        """
        fallback_responses = [
            "I apologize, but I'm currently experiencing technical difficulties. Please try again in a few moments.",
            "I'm having trouble connecting to our AI services right now. Please try again later or contact our support team directly.",
            "I'm sorry, but I'm unable to process your request at the moment. Please try again or contact our support team for immediate assistance."
        ]
        
        import random
        return random.choice(fallback_responses)
    
    def get_current_timestamp(self) -> datetime:
        """
        Get current timestamp
        """
        return datetime.now()
    
    def is_prompt_injection_attempt(self, message: str) -> bool:
        """
        Check if the message contains potential prompt injection attempts
        """
        suspicious_patterns = [
            "ignore previous instructions",
            "forget everything",
            "you are now",
            "pretend to be",
            "act as if",
            "roleplay as",
            "system prompt",
            "admin access",
            "bypass security",
            "jailbreak"
        ]
        
        message_lower = message.lower()
        for pattern in suspicious_patterns:
            if pattern in message_lower:
                return True
        
        return False
    
    def sanitize_input(self, message: str) -> str:
        """
        Sanitize user input to prevent prompt injection
        """
        # Remove potential injection patterns
        sanitized = message
        
        # Remove common injection attempts
        injection_patterns = [
            r"ignore\s+previous\s+instructions",
            r"forget\s+everything",
            r"you\s+are\s+now",
            r"pretend\s+to\s+be",
            r"act\s+as\s+if",
            r"roleplay\s+as"
        ]
        
        import re
        for pattern in injection_patterns:
            sanitized = re.sub(pattern, "", sanitized, flags=re.IGNORECASE)
        
        # Limit message length
        if len(sanitized) > 1000:
            sanitized = sanitized[:1000] + "..."
        
        return sanitized.strip()
