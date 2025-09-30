package com.booking.payload.response;

import com.booking.entity.ChatSession;
import com.booking.entity.ChatStatus;
import java.time.LocalDateTime;

public class ChatSessionResponse {
    
    private Long id;
    private String reportId;
    private Long userId;
    private ChatStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public ChatSessionResponse(ChatSession chatSession) {
        this.id = chatSession.getId();
        this.reportId = chatSession.getReportId();
        this.userId = chatSession.getUser().getId();
        this.status = chatSession.getStatus();
        this.createdAt = chatSession.getCreatedAt();
        this.updatedAt = chatSession.getUpdatedAt();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getReportId() {
        return reportId;
    }
    
    public void setReportId(String reportId) {
        this.reportId = reportId;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public ChatStatus getStatus() {
        return status;
    }
    
    public void setStatus(ChatStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
