import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyOtp } from '../../api/api';

export default function OtpVerify({ navigation, route }) {
  const { mobile } = route.params; // from login screen

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (key, index) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const verifyOtpHandler = async () => {
    const finalOtp = otp.join('');

    if (finalOtp.length !== 6) {
      Alert.alert('Error', 'Enter 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const res = await verifyOtp(mobile, finalOtp);

      console.log('OTP SUCCESS:', res.data);

      const token = res.data?.token;

      if (!token) {
        Alert.alert('Error', 'Token not received from backend');
        return;
      }

      // save token
      await AsyncStorage.setItem('token', token);

      Alert.alert('Success', 'Login Successful');

      navigation.replace('HomeTabs');

    } catch (error) {
      console.log('OTP ERROR:', error?.response?.data || error.message);

      Alert.alert('Invalid OTP', 'Try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter OTP sent to {mobile}
      </Text>

      <View style={styles.otpRow}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleBackspace(nativeEvent.key, index)
            }
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={verifyOtpHandler}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}