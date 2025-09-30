package com.booking.controller;

import com.booking.entity.ChatMessage;
import com.booking.entity.ChatSession;
import com.booking.entity.MessageSenderType;
import com.booking.entity.User;
import com.booking.payload.request.ChatMessageRequest;
import com.booking.payload.response.ChatMessageResponse;
import com.booking.payload.response.ChatSessionResponse;
import com.booking.security.UserPrincipal;
import com.booking.service.ChatService;
import com.booking.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    
    @Autowired
    private ChatService chatService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/start")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> startChatSession(Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            ChatSession chatSession = chatService.createChatSession(user);
            return ResponseEntity.ok(new ChatSessionResponse(chatSession));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error starting chat session: " + e.getMessage());
        }
    }
    
    @GetMapping("/sessions")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> getMyChatSessions(Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            List<ChatSession> chatSessions = chatService.getUserChatSessions(user);
            List<ChatSessionResponse> chatSessionResponses = chatSessions.stream()
                    .map(ChatSessionResponse::new)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(chatSessionResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving chat sessions: " + e.getMessage());
        }
    }
    
    @GetMapping("/sessions/{reportId}/messages")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> getChatMessages(@PathVariable String reportId, 
                                           Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            ChatSession chatSession = chatService.findByReportId(reportId).orElse(null);
            if (chatSession == null || !chatSession.getUser().getId().equals(user.getId())) {
                return ResponseEntity.badRequest().body("Chat session not found or access denied");
            }
            
            List<ChatMessage> messages = chatService.getChatMessages(chatSession);
            List<ChatMessageResponse> messageResponses = messages.stream()
                    .map(ChatMessageResponse::new)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(messageResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving chat messages: " + e.getMessage());
        }
    }
    
    @PostMapping("/sessions/{reportId}/send")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> sendMessage(@PathVariable String reportId,
                                       @Valid @RequestBody ChatMessageRequest messageRequest,
                                       Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            ChatSession chatSession = chatService.findByReportId(reportId).orElse(null);
            if (chatSession == null || !chatSession.getUser().getId().equals(user.getId())) {
                return ResponseEntity.badRequest().body("Chat session not found or access denied");
            }
            
            // Add user message
            ChatMessage userMessage = chatService.addMessage(chatSession, messageRequest.getContent(), MessageSenderType.USER);
            
            // Get AI response
            String aiResponse = chatService.getAIResponse(messageRequest.getContent(), reportId);
            
            // Add AI message
            ChatMessage aiMessage = chatService.addMessage(chatSession, aiResponse, MessageSenderType.AI);
            
            return ResponseEntity.ok(new ChatMessageResponse(aiMessage));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error sending message: " + e.getMessage());
        }
    }
    
    @PostMapping("/sessions/{reportId}/close")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> closeChatSession(@PathVariable String reportId, 
                                           Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            ChatSession chatSession = chatService.findByReportId(reportId).orElse(null);
            if (chatSession == null || !chatSession.getUser().getId().equals(user.getId())) {
                return ResponseEntity.badRequest().body("Chat session not found or access denied");
            }
            
            chatService.closeChatSession(reportId);
            return ResponseEntity.ok("Chat session closed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error closing chat session: " + e.getMessage());
        }
    }
    
    @PostMapping("/sessions/{reportId}/escalate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> escalateChatSession(@PathVariable String reportId) {
        try {
            chatService.escalateChatSession(reportId);
            return ResponseEntity.ok("Chat session escalated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error escalating chat session: " + e.getMessage());
        }
    }
}
