package com.booking.service;

import com.booking.entity.Booking;
import com.booking.entity.BookingStatus;
import com.booking.entity.User;
import com.booking.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    public Booking createBooking(User user, LocalDateTime bookingDateTime, 
                                Integer durationMinutes, String serviceName, 
                                String serviceDescription, BigDecimal price) {
        Booking booking = new Booking(user, bookingDateTime, durationMinutes, 
                                    serviceName, serviceDescription, price);
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getUserBookings(User user) {
        return bookingRepository.findByUser(user);
    }
    
    public List<Booking> getUserBookingsByStatus(User user, BookingStatus status) {
        return bookingRepository.findByUserAndStatus(user, status);
    }
    
    public List<Booking> getBookingsByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return bookingRepository.findByBookingDateTimeBetween(startDate, endDate);
    }
    
    public List<Booking> getUpcomingBookingsByStatus(BookingStatus status, LocalDateTime date) {
        return bookingRepository.findUpcomingBookingsByStatus(status, date);
    }
    
    public Optional<Booking> findById(Long id) {
        return bookingRepository.findById(id);
    }
    
    public Optional<Booking> findByStripePaymentIntentId(String paymentIntentId) {
        return bookingRepository.findByStripePaymentIntentId(paymentIntentId);
    }
    
    public Booking updateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }
    
    public void cancelBooking(Long bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus(BookingStatus.CANCELLED);
            bookingRepository.save(booking);
        }
    }
    
    public void rescheduleBooking(Long bookingId, LocalDateTime newDateTime) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setBookingDateTime(newDateTime);
            booking.setStatus(BookingStatus.RESCHEDULED);
            bookingRepository.save(booking);
        }
    }
    
    public void completeBooking(Long bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isPresent()) {
            Booking booking = bookingOpt.get();
            booking.setStatus(BookingStatus.COMPLETED);
            bookingRepository.save(booking);
        }
    }
    
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
