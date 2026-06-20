import API from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// SEND OTP
export const sendOtp = (phone) => {
  return API.post('/auth/send-otp', { phone });
};

// VERIFY OTP + SAVE JWT
export const verifyOtp = async (phone, otp) => {
  const res = await API.post('/auth/verify-otp', { phone, otp });

  const { token, user } = res.data;

  await AsyncStorage.setItem('TOKEN', token);
  await AsyncStorage.setItem('USER', JSON.stringify(user));

  return user;
};

// LOGOUT
export const logout = async () => {
  await AsyncStorage.clear();
};