package com.booking.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_session_id", nullable = false)
    private ChatSession chatSession;
    
    @NotBlank
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sender_type")
    private MessageSenderType senderType;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors
    public ChatMessage() {}
    
    public ChatMessage(ChatSession chatSession, String content, MessageSenderType senderType) {
        this.chatSession = chatSession;
        this.content = content;
        this.senderType = senderType;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public ChatSession getChatSession() {
        return chatSession;
    }
    
    public void setChatSession(ChatSession chatSession) {
        this.chatSession = chatSession;
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
