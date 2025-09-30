package com.booking.repository;

import com.booking.entity.ChatSession;
import com.booking.entity.ChatStatus;
import com.booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    
    List<ChatSession> findByUser(User user);
    
    List<ChatSession> findByUserAndStatus(User user, ChatStatus status);
    
    Optional<ChatSession> findByReportId(String reportId);
    
    @Query("SELECT cs FROM ChatSession cs WHERE cs.status = :status")
    List<ChatSession> findByStatus(@Param("status") ChatStatus status);
    
    @Query("SELECT cs FROM ChatSession cs WHERE cs.user.role = :role")
    List<ChatSession> findByUserRole(@Param("role") com.booking.entity.Role role);
}
