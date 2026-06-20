import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import API from '../../api/api';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const onContinue = async () => {
    if (mobile.length !== 10) {
      Alert.alert('Invalid Number', 'Enter valid 10 digit mobile number');
      return;
    }

    try {
      setLoading(true);

      // 🔥 REAL OTP API CALL
      await API.post('/auth/send-otp', {
        mobile: mobile,
      });

      setLoading(false);

      navigation.navigate('OtpScreen', {
        mobile: mobile,
      });

    } catch (error) {
      setLoading(false);
      Alert.alert(
        'OTP Failed',
        error?.response?.data?.message || 'Unable to send OTP'
      );
    }
  };

  return (
    <LinearGradient
      colors={['#0f172a', '#020617']}
      style={styles.container}
    >
      {/* LOGO */}
      <View style={styles.logoWrap}>
        <LinearGradient
          colors={['#ff4ecd', '#6a5cff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.logoPill}
        >
          <Text style={styles.logoText}>RONEX</Text>
        </LinearGradient>

        <Text style={styles.tagline}>
          Watch • Create • Share
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>
          Enter mobile number to continue
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#94a3b8"
          keyboardType="number-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={onContinue}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  logoWrap: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logoPill: {
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 30,
  },

  logoText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 4,
  },

  tagline: {
    marginTop: 12,
    color: '#94a3b8',
    fontSize: 14,
    letterSpacing: 1,
  },

  card: {
    backgroundColor: '#020617',
    padding: 26,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },

  subtitle: {
    fontSize: 14,
    color: '#cbd5f5',
    marginBottom: 22,
    textAlign: 'center',
  },

  input: {
    height: 52,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#0f172a',
    color: '#fff',
    marginBottom: 20,
  },

  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10c036',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
});