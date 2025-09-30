package com.booking.payload.request;

import jakarta.validation.constraints.NotBlank;

public class ChatMessageRequest {
    
    @NotBlank
    private String content;
    
    public ChatMessageRequest() {}
    
    public ChatMessageRequest(String content) {
        this.content = content;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
}
