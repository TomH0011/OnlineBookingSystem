package com.booking.repository;

import com.booking.entity.Role;
import com.booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    Boolean existsByUsername(String username);
    
    Boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.role = :role")
    java.util.List<User> findByRole(@Param("role") Role role);
    
    @Query("SELECT u FROM User u WHERE u.customerSupportId = :customerSupportId")
    Optional<User> findByCustomerSupportId(@Param("customerSupportId") String customerSupportId);
}
