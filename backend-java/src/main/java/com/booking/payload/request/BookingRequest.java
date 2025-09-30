package com.booking.payload.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class BookingRequest {
    
    @NotNull
    private LocalDateTime bookingDateTime;
    
    @NotNull
    @Positive
    private Integer durationMinutes;
    
    private String serviceName;
    
    private String serviceDescription;
    
    @NotNull
    @Positive
    private BigDecimal price;
    
    private String notes;
    
    public BookingRequest() {}
    
    public BookingRequest(LocalDateTime bookingDateTime, Integer durationMinutes, 
                         String serviceName, String serviceDescription, BigDecimal price) {
        this.bookingDateTime = bookingDateTime;
        this.durationMinutes = durationMinutes;
        this.serviceName = serviceName;
        this.serviceDescription = serviceDescription;
        this.price = price;
    }
    
    public LocalDateTime getBookingDateTime() {
        return bookingDateTime;
    }
    
    public void setBookingDateTime(LocalDateTime bookingDateTime) {
        this.bookingDateTime = bookingDateTime;
    }
    
    public Integer getDurationMinutes() {
        return durationMinutes;
    }
    
    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
    
    public String getServiceName() {
        return serviceName;
    }
    
    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
    
    public String getServiceDescription() {
        return serviceDescription;
    }
    
    public void setServiceDescription(String serviceDescription) {
        this.serviceDescription = serviceDescription;
    }
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
