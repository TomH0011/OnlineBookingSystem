package com.booking.repository;

import com.booking.entity.Booking;
import com.booking.entity.BookingStatus;
import com.booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUser(User user);
    
    List<Booking> findByUserAndStatus(User user, BookingStatus status);
    
    @Query("SELECT b FROM Booking b WHERE b.bookingDateTime BETWEEN :startDate AND :endDate")
    List<Booking> findByBookingDateTimeBetween(@Param("startDate") LocalDateTime startDate, 
                                               @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT b FROM Booking b WHERE b.status = :status AND b.bookingDateTime >= :date")
    List<Booking> findUpcomingBookingsByStatus(@Param("status") BookingStatus status, 
                                               @Param("date") LocalDateTime date);
    
    @Query("SELECT b FROM Booking b WHERE b.stripePaymentIntentId = :paymentIntentId")
    Optional<Booking> findByStripePaymentIntentId(@Param("paymentIntentId") String paymentIntentId);
}
