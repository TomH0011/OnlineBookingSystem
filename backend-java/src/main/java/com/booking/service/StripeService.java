package com.booking.service;

import com.booking.entity.Booking;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {
    
    @Value("${stripe.secret-key}")
    private String secretKey;
    
    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }
    
    public PaymentIntent createPaymentIntent(BigDecimal amount, String currency, String description) throws StripeException {
        // Convert BigDecimal to cents (Stripe uses smallest currency unit)
        long amountInCents = amount.multiply(new BigDecimal("100")).longValue();
        
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(currency)
                .setDescription(description)
                .setAutomaticPaymentMethods(
                    PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                        .setEnabled(true)
                        .build()
                )
                .build();
        
        return PaymentIntent.create(params);
    }
    
    public PaymentIntent confirmPaymentIntent(String paymentIntentId) throws StripeException {
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        return paymentIntent.confirm();
    }
    
    public PaymentIntent cancelPaymentIntent(String paymentIntentId) throws StripeException {
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        return paymentIntent.cancel();
    }
    
    public PaymentIntent retrievePaymentIntent(String paymentIntentId) throws StripeException {
        return PaymentIntent.retrieve(paymentIntentId);
    }
    
    public Map<String, Object> createCheckoutSession(BigDecimal amount, String currency, String successUrl, String cancelUrl) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("payment_method_types", new String[]{"card"});
        params.put("line_items", new Object[]{
            Map.of(
                "price_data", Map.of(
                    "currency", currency,
                    "product_data", Map.of("name", "Booking Service"),
                    "unit_amount", amount.multiply(new BigDecimal("100")).longValue()
                ),
                "quantity", 1
            )
        });
        params.put("mode", "payment");
        params.put("success_url", successUrl);
        params.put("cancel_url", cancelUrl);
        
        return params;
    }
}
