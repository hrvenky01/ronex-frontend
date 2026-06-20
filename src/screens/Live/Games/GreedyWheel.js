import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Alert,
  ScrollView,
} from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';

const SIZE = 260;
const RADIUS = SIZE / 2;
const SEGMENTS = 8;
const ANGLE = 360 / SEGMENTS;

/* 🎯 BET VALUES */
const BET_AMOUNTS = [
  20, 50 ,100,  500, 1000,
  2000,  5000,
];

const segments = [
  { label: '🍎 APPLE', color: '#ec4899', multiplier: 2 },
  { label: '🐶 DOG', color: '#3b82f6', multiplier: 7 },
  { label: '🍌 BANANA', color: '#facc15', multiplier: 2 },
  { label: '🐱 CAT', color: '#6366f1', multiplier: 15 },
  { label: '🍊 ORANGE', color: '#f97316', multiplier: 3 },
  { label: '🐯 TIGER', color: '#ec4899', multiplier: 25 },
  { label: '🍉 WATERMELON', color: '#22c55e', multiplier: 5 },
  { label: '🦁 LION', color: '#a855f7', multiplier: 35 },
];

const polarToCartesian = (cx, cy, r, angle) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const describeArc = (x, y, r, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, r, startAngle);
  const end = polarToCartesian(x, y, r, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `
    M ${x} ${y}
    L ${start.x} ${start.y}
    A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}
    Z
  `;
};

export default function GreedyWheel() {
  const spinValue = useRef(new Animated.Value(0)).current;

  const [bet, setBet] = useState(0);
  const [lastClicked, setLastClicked] = useState(null);
  const [spinning, setSpinning] = useState(false);

  /* ➕ ADD BET LOGIC */
  const addBet = (amount) => {
    setBet(prev => prev + amount);
    setLastClicked(amount);
  };

  const spinWheel = async () => {
  if (spinning) return;

  if (bet <= 0) {
    Alert.alert('⚠️ Select Bet Amount');
    return;
  }

  try {
    setSpinning(true);

    // 🔥 RESET WHEEL (VERY IMPORTANT)
    spinValue.setValue(0);

    const res = await fetch(
      'http://YOUR_SERVER_IP:8080/api/games/greedy-wheel/spin',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          betAmount: bet,
        }),
      }
    );

    const data = await res.json();
    const index = data.resultIndex;

    // 🎯 Always spin many rounds + final position
    const rotateTo = 360 * 6 + index * ANGLE;

    Animated.timing(spinValue, {
      toValue: rotateTo,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setSpinning(false);
      setBet(0);
      setLastClicked(null);

      Alert.alert(
        '🎉 Result',
        `You won ${data.winAmount} coins\nBalance: ${data.walletBalance}`
      );
    });
  } catch (e) {
    Alert.alert('Error', e.message);
    setSpinning(false);
  }
};


  const rotate = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎡 Greedy Wheel</Text>

      {/* 🎡 WHEEL */}
      <View style={styles.wheelContainer}>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Svg width={SIZE} height={SIZE}>
            <G>
              {segments.map((seg, i) => {
                const startAngle = i * ANGLE - 90;
                const endAngle = startAngle + ANGLE;
                const midAngle = startAngle + ANGLE / 2;

                const textPos = polarToCartesian(
                  RADIUS,
                  RADIUS,
                  RADIUS - 55,
                  midAngle
                );

                return (
                  <G key={i}>
                    <Path
                      d={describeArc(
                        RADIUS,
                        RADIUS,
                        RADIUS,
                        startAngle,
                        endAngle
                      )}
                      fill={seg.color}
                    />
                    <SvgText
                      x={textPos.x}
                      y={textPos.y - 6}
                      fill="#fff"
                      fontSize={11}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {seg.label}
                    </SvgText>
                    <SvgText
                      x={textPos.x}
                      y={textPos.y + 10}
                      fill="#fde047"
                      fontSize={11}
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      x{seg.multiplier}
                    </SvgText>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>

        <View style={styles.pointer} />
      </View>

      {/* 💰 BETTING */}
      <Text style={styles.betTitle}>💰 BETTING</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {BET_AMOUNTS.map(amount => (
          <Text
            key={amount}
            onPress={() => addBet(amount)}
            style={[
              styles.betAmount,
              lastClicked === amount && styles.betAmountActive,
            ]}
          >
            {amount}
          </Text>
        ))}
      </ScrollView>

      <Text style={styles.currentBet}>TOTAL BET: {bet}</Text>

      <TouchableOpacity style={styles.button} onPress={spinWheel}>
        <Text style={styles.buttonText}>
          {spinning ? 'Spinning...' : 'SPIN'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  wheelContainer: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointer: {
    position: 'absolute',
    top: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderBottomWidth: 22,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#f472b6',
  },

  betTitle: {
    marginTop: 22,
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  betAmount: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    fontWeight: '700',
    marginHorizontal: 12,
  },
  betAmountActive: {
    color: '#38bdf8',
    textDecorationLine: 'underline',
  },
  currentBet: {
    marginTop: 10,
    color: '#f472b6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 18,
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});