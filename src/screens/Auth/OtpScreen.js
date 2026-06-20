import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function OtpScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { phone } = route.params;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key, index) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const onVerifyOtp = async () => {
    const finalOtp = otp.join('');

    if (finalOtp.length !== 6) {
      Alert.alert('Invalid OTP', 'Enter 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      // 🔥 API CALL (later replace URL)
      /*
      await axios.post("/api/auth/verify-otp", {
        phone,
        otp: finalOtp,
        referralCode: referralCode || null,
      });
      */

      // TEMP SUCCESS
      setTimeout(() => {
        setLoading(false);
        navigation.replace('MainTabs');
      }, 800);

    } catch (e) {
      setLoading(false);
      Alert.alert('Error', 'OTP verification failed');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>OTP sent to {phone}</Text>

      {/* OTP BOXES */}
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
            autoFocus={index === 0}
          />
        ))}
      </View>

      {/* REFERRAL CODE */}
      <TextInput
        style={styles.referralInput}
        placeholder="Referral Code (optional)"
        placeholderTextColor="#999"
        value={referralCode}
        onChangeText={setReferralCode}
        autoCapitalize="characters"
      />

      {/* VERIFY BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={onVerifyOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 26,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  referralInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 24,
    color: '#000',
  },
  button: {
    height: 50,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});