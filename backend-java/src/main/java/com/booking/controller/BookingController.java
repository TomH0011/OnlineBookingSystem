package com.booking.controller;

import com.booking.entity.Booking;
import com.booking.entity.BookingStatus;
import com.booking.entity.User;
import com.booking.payload.request.BookingRequest;
import com.booking.payload.response.BookingResponse;
import com.booking.security.UserPrincipal;
import com.booking.service.BookingService;
import com.booking.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/booking")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/create")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> createBooking(@Valid @RequestBody BookingRequest bookingRequest, 
                                         Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            Booking booking = bookingService.createBooking(
                user,
                bookingRequest.getBookingDateTime(),
                bookingRequest.getDurationMinutes(),
                bookingRequest.getServiceName(),
                bookingRequest.getServiceDescription(),
                bookingRequest.getPrice()
            );
            
            return ResponseEntity.ok(new BookingResponse(booking));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating booking: " + e.getMessage());
        }
    }
    
    @GetMapping("/my-bookings")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> getMyBookings(Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            List<Booking> bookings = bookingService.getUserBookings(user);
            List<BookingResponse> bookingResponses = bookings.stream()
                    .map(BookingResponse::new)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(bookingResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving bookings: " + e.getMessage());
        }
    }
    
    @GetMapping("/my-bookings/{status}")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> getMyBookingsByStatus(@PathVariable String status, 
                                                  Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            BookingStatus bookingStatus = BookingStatus.valueOf(status.toUpperCase());
            List<Booking> bookings = bookingService.getUserBookingsByStatus(user, bookingStatus);
            List<BookingResponse> bookingResponses = bookings.stream()
                    .map(BookingResponse::new)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(bookingResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving bookings: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id, Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            // Check if user owns the booking
            Booking booking = bookingService.findById(id).orElse(null);
            if (booking == null || !booking.getUser().getId().equals(user.getId())) {
                return ResponseEntity.badRequest().body("Booking not found or access denied");
            }
            
            bookingService.cancelBooking(id);
            return ResponseEntity.ok("Booking cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error cancelling booking: " + e.getMessage());
        }
    }
    
    @PutMapping("/{id}/reschedule")
    @PreAuthorize("hasRole('CUSTOMER') or hasRole('BUSINESS')")
    public ResponseEntity<?> rescheduleBooking(@PathVariable Long id, 
                                              @RequestParam LocalDateTime newDateTime,
                                              Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userService.findById(userPrincipal.getId()).orElse(null);
            
            if (user == null) {
                return ResponseEntity.badRequest().body("User not found");
            }
            
            // Check if user owns the booking
            Booking booking = bookingService.findById(id).orElse(null);
            if (booking == null || !booking.getUser().getId().equals(user.getId())) {
                return ResponseEntity.badRequest().body("Booking not found or access denied");
            }
            
            bookingService.rescheduleBooking(id, newDateTime);
            return ResponseEntity.ok("Booking rescheduled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error rescheduling booking: " + e.getMessage());
        }
    }
    
    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllBookings() {
        try {
            // This would need to be implemented in BookingService
            return ResponseEntity.ok("Admin endpoint - all bookings");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error retrieving all bookings: " + e.getMessage());
        }
    }
}
