import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  TextInput,
  Alert,
} from 'react-native';

const SYMBOLS = ['7', '🍒', '🍋', '🔔', '⭐'];
const ITEM_HEIGHT = 70;

export default function SevenSevenSeven() {
  const reel1 = useRef(new Animated.Value(0)).current;
  const reel2 = useRef(new Animated.Value(0)).current;
  const reel3 = useRef(new Animated.Value(0)).current;

  const [bet, setBet] = useState('');
  const [result, setResult] = useState(null);
  const [spinning, setSpinning] = useState(false);

const spin = () => {
  if (spinning) return;

  if (!bet || isNaN(bet)) {
    Alert.alert('Enter valid bet amount');
    return;
  }

  setSpinning(true);
  setResult(null);

  // 🔥 RESET reels (VERY IMPORTANT)
  reel1.setValue(0);
  reel2.setValue(0);
  reel3.setValue(0);

  // 🎯 probability logic
  const r = Math.random() * 100;

  let symbols = [];
  let multiplier = 0;

  if (r < 40) {
    multiplier = 0;
    let s1, s2, s3;
    do {
      s1 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      s2 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      s3 = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    } while (s1 === s2 || s2 === s3 || s1 === s3);
    symbols = [s1, s2, s3];
  } else if (r < 80) {
    multiplier = 2;
    const m = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    let o;
    do {
      o = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    } while (o === m);
    const patterns = [
      [m, m, o],
      [m, o, m],
      [o, m, m],
    ];
    symbols = patterns[Math.floor(Math.random() * patterns.length)];
  } else if (r < 95) {
    multiplier = 5;
    const s = SYMBOLS.filter(x => x !== '7')[
      Math.floor(Math.random() * (SYMBOLS.length - 1))
    ];
    symbols = [s, s, s];
  } else {
    multiplier = 20;
    symbols = ['7', '7', '7'];
  }

  const i1 = SYMBOLS.indexOf(symbols[0]);
  const i2 = SYMBOLS.indexOf(symbols[1]);
  const i3 = SYMBOLS.indexOf(symbols[2]);

  Animated.parallel([
    Animated.timing(reel1, {
      toValue: -(i1 * ITEM_HEIGHT + SYMBOLS.length * ITEM_HEIGHT * 3),
      duration: 2000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
    Animated.timing(reel2, {
      toValue: -(i2 * ITEM_HEIGHT + SYMBOLS.length * ITEM_HEIGHT * 4),
      duration: 2400,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
    Animated.timing(reel3, {
      toValue: -(i3 * ITEM_HEIGHT + SYMBOLS.length * ITEM_HEIGHT * 5),
      duration: 2800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }),
  ]).start(() => {
    setResult({ symbols, multiplier });
    setSpinning(false);
  });
};



  const renderReel = (animatedValue) => (
    <View style={styles.reelWindow}>
      <Animated.View style={{ transform: [{ translateY: animatedValue }] }}>
        {Array(10)
          .fill(SYMBOLS)
          .flat()
          .map((s, i) => (
            <View key={i} style={styles.symbolBox}>
              <Text
                style={[
                  styles.symbol,
                  s === '7' && styles.sevenSymbol, // ⭐ ONLY CHANGE
                ]}
              >
                {s}
              </Text>
            </View>
          ))}
      </Animated.View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎰 LUCKY 777</Text>

      <View style={styles.reels}>
        {renderReel(reel1)}
        {renderReel(reel2)}
        {renderReel(reel3)}
      </View>

      {/* MIDDLE RESULT LINE */}
      <View style={styles.middleLine} />

      <TextInput
        placeholder="Enter Bet Amount"
        placeholderTextColor="#aaa"
        value={bet}
        onChangeText={setBet}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={spin}>
        <Text style={styles.buttonText}>
          {spinning ? 'Spinning...' : 'SPIN'}
        </Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultSymbols}>
            {result.symbols.join('  ')}
          </Text>
          <Text style={styles.resultText}>
            🎯 Multiplier x{result.multiplier}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reels: {
    flexDirection: 'row',
    gap: 12,
  },
  reelWindow: {
    width: 80,
    height: ITEM_HEIGHT * 3,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#020617',
    borderWidth: 2,
    borderColor: '#334155',
  },
  symbolBox: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontSize: 40,
    color: '#ffffff',
  },
  sevenSymbol: {
    color: '#facc15', // 💛 GOLD color for 7
    fontWeight: 'bold',
  },
  middleLine: {
    position: 'absolute',
    width: 260,
    height: 4,
    backgroundColor: '#22c55e',
    top: '50%',
  },
  input: {
    width: '70%',
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginTop: 25,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#1e293b',
    borderRadius: 10,
    alignItems: 'center',
  },
  resultSymbols: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 6,
  },
  resultText: {
    color: '#22c55e',
    fontSize: 18,
    fontWeight: '700',
  },
});