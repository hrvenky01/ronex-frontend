import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';

import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

const packs = [
  { id: 'coins_3000', coins: 3000, price: '₹149' },
  { id: 'coins_7000', coins: 7000, price: '₹299' },
  { id: 'coins_10000', coins: 10000, price: '₹499' },
  { id: 'coins_16000', coins: 16000, price: '₹749' },
  { id: 'coins_25000', coins: 25000, price: '₹999' },
  { id: 'coins_35000', coins: 35000, price: '₹1499' },
];

export default function GetCoinsScreen() {

  // 💳 PAYMENT FUNCTION
  const pay = async (item) => {
    try {
      // 1️⃣ Create order from backend
      const res = await axios.post(
        'http://https://ronex-backend.onrender.com/api/payment/create-order',
        {
          userId: 1, // replace with real user id
          amount: parseInt(item.price.replace('₹', '')),
          coins: item.coins,
        }
      );

      // 2️⃣ Razorpay options
      const options = {
        key: 'YOUR_RAZORPAY_KEY',
        amount: res.data.amount * 100, // paise
        currency: 'INR',
        name: 'Ronex Coins',
        order_id: res.data.orderId,
        description: `${item.coins} Coins Purchase`,
        prefill: {
          email: 'user@gmail.com',
        },
      };

      // 3️⃣ Open payment UI
      const payment = await RazorpayCheckout.open(options);

      console.log('Payment Success:', payment);

      Alert.alert(
        'Success',
        'Payment successful! Coins will be added soon.'
      );

    } catch (err) {
      console.log('Payment Error:', err);
      Alert.alert('Payment Failed', 'Try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Coins</Text>

      <FlatList
        data={packs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.pack}>
            <Text style={styles.coins}>🪙 {item.coins} Coins</Text>

            <TouchableOpacity
              style={styles.buyBtn}
              onPress={() => pay(item)}
            >
              <Text style={styles.buyText}>{item.price}</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.note}>
        Coins are virtual currency and cannot be withdrawn.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  pack: {
    backgroundColor: '#0f172a',
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coins: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buyBtn: {
    backgroundColor: '#22c55e',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buyText: {
    color: '#020617',
    fontWeight: '800',
  },
  note: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 20,
    textAlign: 'center',
  },
});