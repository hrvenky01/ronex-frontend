import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const NUMBERS = [1,2,3,4,5,6,7,8,9,10,11,12];
const COINS = [10, 50, 100, 500];

export default function MiniRoulette() {
  const spinAnim = useRef(new Animated.Value(0)).current;

  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [result, setResult] = useState(null);

  const spinWheel = () => {
    if (!selectedNumber || !selectedCoin) {
      Alert.alert('Select Bet', 'Select number & coin first');
      return;
    }

    const randomResult =
      NUMBERS[Math.floor(Math.random() * NUMBERS.length)];

    Animated.timing(spinAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start(() => {
      spinAnim.setValue(0);
      setResult(randomResult);

      if (randomResult === selectedNumber) {
        Alert.alert(
          '🎉 YOU WIN',
          `You won ₹${selectedCoin * 10}`
        );
      } else {
        Alert.alert(
          '❌ YOU LOSE',
          `Result: ${randomResult}`
        );
      }
    });
  };

  const rotate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1800deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎡 Mini Roulette</Text>

      {/* WHEEL */}
      <View style={styles.wheelContainer}>
        <Animated.View
          style={[styles.wheel, { transform: [{ rotate }] }]}
        >
          {NUMBERS.map((num, index) => {
            const angle = (index * 360) / NUMBERS.length;
            const radius = 90;

            const x =
              radius *
              Math.cos(((angle - 90) * Math.PI) / 180);
            const y =
              radius *
              Math.sin(((angle - 90) * Math.PI) / 180);

            return (
              <View
                key={num}
                style={{
                  position: 'absolute',
                  left: 120 + x - 16,
                  top: 120 + y - 16,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor:
                    num % 2 === 0 ? '#111827' : '#dc2626',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#FFD700',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12 }}>
                  {num}
                </Text>
              </View>
            );
          })}

          <View style={styles.centerHub}>
            <Text style={{ fontWeight: 'bold' }}>RONEX</Text>
          </View>
        </Animated.View>

        <View style={styles.pointer} />
      </View>

      {/* SELECT NUMBER */}
      <Text style={styles.section}>Select Number</Text>
      <View style={styles.grid}>
        {NUMBERS.map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => setSelectedNumber(num)}
            style={[
              styles.numBox,
              selectedNumber === num && styles.selected,
            ]}
          >
            <Text style={{ color: '#fff' }}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SELECT COIN */}
      <Text style={styles.section}>Select Coin</Text>
      <View style={{ flexDirection: 'row' }}>
        {COINS.map((coin) => (
          <TouchableOpacity
            key={coin}
            onPress={() => setSelectedCoin(coin)}
            style={[
              styles.coin,
              selectedCoin === coin && styles.selectedCoin,
            ]}
          >
            <Text style={{ color: '#fff' }}>₹{coin}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SPIN */}
      <TouchableOpacity
        style={styles.spinBtn}
        onPress={spinWheel}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          SPIN 🎰
        </Text>
      </TouchableOpacity>

      {result && (
        <Text style={styles.result}>
          Result: {result}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1220',
    alignItems: 'center',
    paddingTop: 40,
  },

  title: {
    color: '#FFD700',
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  wheelContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wheel: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#1f2937',
    borderWidth: 8,
    borderColor: '#FFD700',
  },

  centerHub: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFD700',
    position: 'absolute',
    top: 85,
    left: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pointer: {
    position: 'absolute',
    top: 5,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFD700',
  },

  section: {
    color: '#00ffcc',
    marginTop: 10,
    marginBottom: 5,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 260,
  },

  numBox: {
    width: 40,
    height: 40,
    backgroundColor: '#1e293b',
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  selected: {
    backgroundColor: '#dc2626',
  },

  coin: {
    padding: 10,
    backgroundColor: '#334155',
    margin: 6,
    borderRadius: 6,
  },

  selectedCoin: {
    backgroundColor: '#16a34a',
  },

  spinBtn: {
    marginTop: 15,
    backgroundColor: '#dc2626',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },

  result: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});