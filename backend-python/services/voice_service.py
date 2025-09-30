import elevenlabs
import os
import logging
from typing import List, Dict, Optional
import asyncio
import httpx

logger = logging.getLogger(__name__)

class VoiceService:
    def __init__(self):
        # Initialize ElevenLabs
        elevenlabs.set_api_key(os.getenv("ELEVENLABS_API_KEY"))
        
        # British voice configurations
        self.british_voices = {
            "male_british_1": {
                "voice_id": "pNInz6obpgDQGcFmaJgB",  # Adam (British Male)
                "name": "Adam",
                "accent": "British",
                "gender": "Male"
            },
            "male_british_2": {
                "voice_id": "EXAVITQu4vr4xnSDxMaL",  # Bella (British Female)
                "name": "Bella", 
                "accent": "British",
                "gender": "Female"
            },
            "female_british_1": {
                "voice_id": "VR6AewLTigWG4xSOukaG",  # Arnold (British Male)
                "name": "Arnold",
                "accent": "British", 
                "gender": "Male"
            },
            "female_british_2": {
                "voice_id": "AZnzlk1XvdvUeBnXmlld",  # Domi (British Female)
                "name": "Domi",
                "accent": "British",
                "gender": "Female"
            }
        }
        
        # Default voice
        self.default_voice = "male_british_1"
    
    async def text_to_speech(self, text: str, voice_id: Optional[str] = None, 
                           accent: str = "british") -> str:
        """
        Convert text to speech using 11labs with British accents
        """
        try:
            # Select voice
            if not voice_id:
                voice_id = self._get_default_voice_for_accent(accent)
            
            # Sanitize text to prevent injection
            sanitized_text = self._sanitize_text(text)
            
            # Generate audio
            audio = await elevenlabs.generate_async(
                text=sanitized_text,
                voice=voice_id,
                model="eleven_multilingual_v2"
            )
            
            # Save audio file (in production, you'd upload to cloud storage)
            audio_filename = f"audio_{hash(text)}.mp3"
            audio_path = f"temp_audio/{audio_filename}"
            
            # Ensure directory exists
            os.makedirs("temp_audio", exist_ok=True)
            
            with open(audio_path, "wb") as f:
                f.write(audio)
            
            # Return URL (in production, this would be a cloud storage URL)
            return f"/audio/{audio_filename}"
            
        except Exception as e:
            logger.error(f"Error in text-to-speech: {str(e)}")
            raise e
    
    async def get_british_voices(self) -> List[Dict[str, str]]:
        """
        Get list of available British voices
        """
        try:
            voices = []
            for voice_key, voice_info in self.british_voices.items():
                voices.append({
                    "id": voice_key,
                    "voice_id": voice_info["voice_id"],
                    "name": voice_info["name"],
                    "accent": voice_info["accent"],
                    "gender": voice_info["gender"]
                })
            return voices
        except Exception as e:
            logger.error(f"Error getting voices: {str(e)}")
            return []
    
    def _get_default_voice_for_accent(self, accent: str) -> str:
        """
        Get default voice for accent
        """
        if accent.lower() == "british":
            return self.british_voices[self.default_voice]["voice_id"]
        
        # Fallback to default
        return self.british_voices[self.default_voice]["voice_id"]
    
    def _sanitize_text(self, text: str) -> str:
        """
        Sanitize text to prevent voice injection attacks
        """
        # Remove potential injection patterns
        sanitized = text
        
        # Remove common voice injection attempts
        injection_patterns = [
            "ignore previous instructions",
            "forget everything", 
            "you are now",
            "pretend to be",
            "act as if",
            "roleplay as",
            "system prompt",
            "admin access",
            "bypass security"
        ]
        
        text_lower = text.lower()
        for pattern in injection_patterns:
            if pattern in text_lower:
                sanitized = sanitized.replace(pattern, "")
        
        # Limit text length
        if len(sanitized) > 500:
            sanitized = sanitized[:500] + "..."
        
        return sanitized.strip()
    
    async def handle_phone_call(self, phone_number: str, message: str) -> str:
        """
        Handle incoming phone calls with voice response
        """
        try:
            # Generate voice response
            audio_url = await self.text_to_speech(
                text=message,
                voice_id=self._get_default_voice_for_accent("british")
            )
            
            # In a real implementation, you would:
            # 1. Integrate with telephony service (Twilio, etc.)
            # 2. Play the audio to the caller
            # 3. Handle call routing and escalation
            
            return audio_url
            
        except Exception as e:
            logger.error(f"Error handling phone call: {str(e)}")
            raise e
    
    def is_voice_injection_attempt(self, text: str) -> bool:
        """
        Check if the text contains potential voice injection attempts
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
        
        text_lower = text.lower()
        for pattern in suspicious_patterns:
            if pattern in text_lower:
                return True
        
        return False
