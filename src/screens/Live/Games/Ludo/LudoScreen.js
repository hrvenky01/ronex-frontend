import React, { useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LudoBoard from './LudoBoard';
import Dice from './Dice';
import Token from './Token';
import { moveStep } from './animations';

export default function LudoScreen() {
  const tokenPos = useRef(new Animated.ValueXY({ x: 40, y: 40 })).current;

  const onRoll = () => {
    const steps = Math.floor(Math.random() * 6) + 1;

    let seq = [];
    for (let i = 1; i <= steps; i++) {
      seq.push(
        moveStep(tokenPos.x, 40 + i * 24),
        moveStep(tokenPos.y, 40)
      );
    }

    Animated.sequence(seq).start();
  };

  return (
    <View style={styles.container}>
      <LudoBoard />

      <Token color="#ef4444" x={tokenPos.x} y={tokenPos.y} />

      <View style={styles.diceWrap}>
        <Dice onRoll={onRoll} />
      </View>
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
  diceWrap: {
    marginTop: 20,
  },
});