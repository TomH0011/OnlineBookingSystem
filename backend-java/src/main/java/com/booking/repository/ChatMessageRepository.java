package com.booking.repository;

import com.booking.entity.ChatMessage;
import com.booking.entity.ChatSession;
import com.booking.entity.MessageSenderType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    List<ChatMessage> findByChatSession(ChatSession chatSession);
    
    List<ChatMessage> findByChatSessionOrderByCreatedAtAsc(ChatSession chatSession);
    
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatSession = :chatSession AND cm.senderType = :senderType")
    List<ChatMessage> findByChatSessionAndSenderType(@Param("chatSession") ChatSession chatSession, 
                                                      @Param("senderType") MessageSenderType senderType);
    
    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatSession = :chatSession ORDER BY cm.createdAt DESC")
    List<ChatMessage> findLatestMessagesByChatSession(@Param("chatSession") ChatSession chatSession);
}
