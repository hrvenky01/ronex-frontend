import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: 'https://ronex-backend.onrender.com/api',
  timeout: 30000,
});

/* 🔐 JWT AUTO ATTACH */
API.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;