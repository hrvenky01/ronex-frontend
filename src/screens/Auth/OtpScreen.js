import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

export default function OtpScreen({ navigation }) {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    // Dummy OTP check
    if (otp === '123456') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } else {
      Alert.alert('Invalid OTP', 'Use demo OTP: 123456');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="6 digit OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.btn} onPress={handleVerify}>
        <Text style={styles.btnText}>Verify OTP</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>Demo OTP: 123456</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 10,
  },
  btn: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  hint: {
    marginTop: 15,
    textAlign: 'center',
    color: '#777',
  },
});