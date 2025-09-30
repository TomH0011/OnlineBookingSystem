package com.booking.service;

import com.booking.entity.ChatMessage;
import com.booking.entity.ChatSession;
import com.booking.entity.ChatStatus;
import com.booking.entity.MessageSenderType;
import com.booking.entity.User;
import com.booking.repository.ChatMessageRepository;
import com.booking.repository.ChatSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class ChatService {
    
    @Autowired
    private ChatSessionRepository chatSessionRepository;
    
    @Autowired
    private ChatMessageRepository chatMessageRepository;
    
    @Value("${ai.backend-url}")
    private String aiBackendUrl;
    
    private final RestTemplate restTemplate = new RestTemplate();
    
    public ChatSession createChatSession(User user) {
        String reportId = generateUniqueReportId();
        ChatSession chatSession = new ChatSession(reportId, user);
        return chatSessionRepository.save(chatSession);
    }
    
    public List<ChatSession> getUserChatSessions(User user) {
        return chatSessionRepository.findByUser(user);
    }
    
    public List<ChatSession> getUserChatSessionsByStatus(User user, ChatStatus status) {
        return chatSessionRepository.findByUserAndStatus(user, status);
    }
    
    public Optional<ChatSession> findByReportId(String reportId) {
        return chatSessionRepository.findByReportId(reportId);
    }
    
    public List<ChatSession> getChatSessionsByStatus(ChatStatus status) {
        return chatSessionRepository.findByStatus(status);
    }
    
    public ChatMessage addMessage(ChatSession chatSession, String content, MessageSenderType senderType) {
        ChatMessage message = new ChatMessage(chatSession, content, senderType);
        return chatMessageRepository.save(message);
    }
    
    public List<ChatMessage> getChatMessages(ChatSession chatSession) {
        return chatMessageRepository.findByChatSessionOrderByCreatedAtAsc(chatSession);
    }
    
    public List<ChatMessage> getChatMessagesBySenderType(ChatSession chatSession, MessageSenderType senderType) {
        return chatMessageRepository.findByChatSessionAndSenderType(chatSession, senderType);
    }
    
    public String getAIResponse(String userMessage, String reportId) {
        try {
            // Prepare request to AI backend
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("message", userMessage);
            requestBody.put("report_id", reportId);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
            
            // Call AI backend
            ResponseEntity<Map> response = restTemplate.postForEntity(
                aiBackendUrl + "/chat", request, Map.class);
            
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                return (String) response.getBody().get("response");
            }
            
        } catch (Exception e) {
            // Log error and return fallback response
            System.err.println("Error calling AI backend: " + e.getMessage());
        }
        
        // Fallback response
        return "I apologize, but I'm currently experiencing technical difficulties. Please try again later or contact our support team.";
    }
    
    public void closeChatSession(String reportId) {
        Optional<ChatSession> chatSessionOpt = chatSessionRepository.findByReportId(reportId);
        if (chatSessionOpt.isPresent()) {
            ChatSession chatSession = chatSessionOpt.get();
            chatSession.setStatus(ChatStatus.CLOSED);
            chatSessionRepository.save(chatSession);
        }
    }
    
    public void escalateChatSession(String reportId) {
        Optional<ChatSession> chatSessionOpt = chatSessionRepository.findByReportId(reportId);
        if (chatSessionOpt.isPresent()) {
            ChatSession chatSession = chatSessionOpt.get();
            chatSession.setStatus(ChatStatus.ESCALATED);
            chatSessionRepository.save(chatSession);
        }
    }
    
    private String generateUniqueReportId() {
        String reportId;
        do {
            reportId = generateRandomReportId();
        } while (chatSessionRepository.findByReportId(reportId).isPresent());
        
        return reportId;
    }
    
    private String generateRandomReportId() {
        Random random = new Random();
        return String.format("%07d", random.nextInt(10000000));
    }
}
