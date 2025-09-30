import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const AI_API_BASE_URL = process.env.REACT_APP_AI_API_URL || 'http://localhost:8000';

// Create axios instances
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const aiApi = axios.create({
  baseURL: AI_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/signin', credentials),
  register: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/signout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// Booking API
export const bookingAPI = {
  createBooking: (bookingData) => api.post('/booking/create', bookingData),
  getMyBookings: () => api.get('/booking/my-bookings'),
  getBookingsByStatus: (status) => api.get(`/booking/my-bookings/${status}`),
  cancelBooking: (id) => api.put(`/booking/${id}/cancel`),
  rescheduleBooking: (id, newDateTime) => api.put(`/booking/${id}/reschedule`, { newDateTime }),
  getAllBookings: () => api.get('/booking/admin/all'),
};

// Chat API
export const chatAPI = {
  startChat: () => api.post('/chat/start'),
  getMyChatSessions: () => api.get('/chat/sessions'),
  getChatMessages: (reportId) => api.get(`/chat/sessions/${reportId}/messages`),
  sendMessage: (reportId, message) => api.post(`/chat/sessions/${reportId}/send`, message),
  closeChat: (reportId) => api.post(`/chat/sessions/${reportId}/close`),
  escalateChat: (reportId) => api.post(`/chat/sessions/${reportId}/escalate`),
};

// AI API
export const aiAPI = {
  chat: (message, reportId, conversationHistory) => 
    aiApi.post('/chat', { 
      message, 
      report_id: reportId, 
      conversation_history: conversationHistory 
    }),
  convertToSpeech: (text, voiceId, accent) => 
    aiApi.post('/voice/convert', { 
      text, 
      voice_id: voiceId, 
      accent 
    }),
  getVoices: () => aiApi.get('/voices'),
  getChatHistory: (reportId) => aiApi.get(`/chat/${reportId}/history`),
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: (paymentData) => api.post('/stripe/create-payment-intent', paymentData),
  confirmPayment: (paymentIntentId) => api.post('/stripe/confirm-payment', { paymentIntentId }),
  cancelPayment: (paymentIntentId) => api.post('/stripe/cancel-payment', { paymentIntentId }),
  getPaymentStatus: (paymentIntentId) => api.get(`/stripe/payment-status?paymentIntentId=${paymentIntentId}`),
  createCheckoutSession: (paymentData) => api.post('/stripe/create-checkout-session', paymentData),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (userData) => api.put('/user/profile', userData),
  changePassword: (passwordData) => api.put('/user/change-password', passwordData),
  deleteAccount: () => api.delete('/user/account'),
};

export default api;
