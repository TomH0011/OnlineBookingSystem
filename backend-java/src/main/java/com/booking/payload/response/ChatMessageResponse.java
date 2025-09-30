package com.booking.payload.response;

import com.booking.entity.ChatMessage;
import com.booking.entity.MessageSenderType;
import java.time.LocalDateTime;

public class ChatMessageResponse {
    
    private Long id;
    private Long chatSessionId;
    private String content;
    private MessageSenderType senderType;
    private LocalDateTime createdAt;
    
    public ChatMessageResponse(ChatMessage chatMessage) {
        this.id = chatMessage.getId();
        this.chatSessionId = chatMessage.getChatSession().getId();
        this.content = chatMessage.getContent();
        this.senderType = chatMessage.getSenderType();
        this.createdAt = chatMessage.getCreatedAt();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getChatSessionId() {
        return chatSessionId;
    }
    
    public void setChatSessionId(Long chatSessionId) {
        this.chatSessionId = chatSessionId;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public MessageSenderType getSenderType() {
        return senderType;
    }
    
    public void setSenderType(MessageSenderType senderType) {
        this.senderType = senderType;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
