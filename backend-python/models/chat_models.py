from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ChatRequest(BaseModel):
    message: str
    report_id: str
    conversation_history: Optional[List[Dict[str, str]]] = None

class ChatResponse(BaseModel):
    response: str
    report_id: str
    timestamp: datetime

class VoiceRequest(BaseModel):
    text: str
    voice_id: Optional[str] = None
    accent: Optional[str] = "british"

class VoiceResponse(BaseModel):
    audio_url: str
    voice_id: str
    accent: str

class ChatMessage(BaseModel):
    id: int
    content: str
    sender_type: str  # 'USER', 'AI', 'ADMIN'
    created_at: datetime

class ChatHistory(BaseModel):
    report_id: str
    messages: List[ChatMessage]
    status: str
    created_at: datetime
    updated_at: datetime

class EscalationRequest(BaseModel):
    report_id: str
    reason: Optional[str] = None
    priority: Optional[str] = "normal"  # 'low', 'normal', 'high', 'urgent'
