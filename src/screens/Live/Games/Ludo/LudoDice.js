import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

export default function LudoDice({ onRoll }) {
  const rotate = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState(1);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    if (rolling) return;
    setRolling(true);

    Animated.timing(rotate, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      rotate.setValue(0);
      const v = Math.floor(Math.random() * 6) + 1;
      setValue(v);
      setRolling(false);
      onRoll(v);
    });
  };

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={roll}>
        <Animated.View style={[styles.dice, { transform: [{ rotate: spin }] }]}>
          <Text style={styles.text}>{value}</Text>
        </Animated.View>
      </TouchableOpacity>
      <Text style={{ color: '#fff', marginTop: 6 }}>Tap Dice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  dice: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  text: { fontSize: 28, fontWeight: 'bold', color: '#000' },
});