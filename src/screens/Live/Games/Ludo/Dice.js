import React, { useRef } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Dice({ onRoll }) {
  const anim = useRef(new Animated.Value(0)).current;

  const roll = () => {
    anim.setValue(0);
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(onRoll);
  };

  const rotate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = anim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.3, 1],
  });

  return (
    <TouchableOpacity onPress={roll}>
      <Animated.View
        style={[
          styles.dice,
          { transform: [{ rotate }, { scale }] },
        ]}
      >
        <Text style={styles.text}>🎲</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dice: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  text: {
    fontSize: 30,
  },
});