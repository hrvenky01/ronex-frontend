import axios from 'axios';

const BASE_URL = 'https://ronex-backend.onrender.com/api/auth'; 
// 🔴 Emulator = 10.0.2.2
// 🔴 Real mobile = PC IP (ex: 192.168.1.5)

export const sendOtpApi = (phone) => {
  return axios.post(`${BASE_URL}/send-otp`, { phone });
};

export const verifyOtpApi = (phone, otp) => {
  return axios.post(`${BASE_URL}/verify-otp`, { phone, otp });
};