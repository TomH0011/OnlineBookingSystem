package com.booking.controller;

import com.booking.entity.Booking;
import com.booking.payload.request.PaymentRequest;
import com.booking.payload.response.PaymentResponse;
import com.booking.service.BookingService;
import com.booking.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/stripe")
public class StripeController {
    
    @Autowired
    private StripeService stripeService;
    
    @Autowired
    private BookingService bookingService;
    
    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        try {
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(
                paymentRequest.getAmount(),
                paymentRequest.getCurrency(),
                paymentRequest.getDescription()
            );
            
            Map<String, Object> response = new HashMap<>();
            response.put("client_secret", paymentIntent.getClientSecret());
            response.put("payment_intent_id", paymentIntent.getId());
            
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error creating payment intent: " + e.getMessage());
        }
    }
    
    @PostMapping("/confirm-payment")
    public ResponseEntity<?> confirmPayment(@RequestParam String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = stripeService.confirmPaymentIntent(paymentIntentId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", paymentIntent.getStatus());
            response.put("payment_intent_id", paymentIntent.getId());
            
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error confirming payment: " + e.getMessage());
        }
    }
    
    @PostMapping("/cancel-payment")
    public ResponseEntity<?> cancelPayment(@RequestParam String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = stripeService.cancelPaymentIntent(paymentIntentId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", paymentIntent.getStatus());
            response.put("payment_intent_id", paymentIntent.getId());
            
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error cancelling payment: " + e.getMessage());
        }
    }
    
    @GetMapping("/payment-status")
    public ResponseEntity<?> getPaymentStatus(@RequestParam String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = stripeService.retrievePaymentIntent(paymentIntentId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("status", paymentIntent.getStatus());
            response.put("amount", paymentIntent.getAmount());
            response.put("currency", paymentIntent.getCurrency());
            
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error retrieving payment status: " + e.getMessage());
        }
    }
    
    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody PaymentRequest paymentRequest) {
        try {
            Map<String, Object> sessionParams = stripeService.createCheckoutSession(
                paymentRequest.getAmount(),
                paymentRequest.getCurrency(),
                paymentRequest.getSuccessUrl(),
                paymentRequest.getCancelUrl()
            );
            
            return ResponseEntity.ok(sessionParams);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Error creating checkout session: " + e.getMessage());
        }
    }
}
