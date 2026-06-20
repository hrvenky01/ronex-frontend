import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import LudoDice from './LudoDice';
import LudoBoard from './LudoBoard';

const FINISH = 19;

export default function LudoGame() {
  // ✅ ALL HOOKS AT TOP LEVEL
  const [position, setPosition] = useState(0);
  const [turn, setTurn] = useState('USER');
  const [rolling, setRolling] = useState(false);

  const onDiceRoll = (value) => {
    if (turn !== 'USER' || rolling) return;

    setRolling(true);

    let next = position + value;

    setTimeout(() => {
      if (next >= FINISH) {
        Alert.alert('🎉 YOU WIN');
        setPosition(0);
        setTurn('USER');
        setRolling(false);
        return;
      }

      setPosition(next);
      setTurn('BOT');
      setRolling(false);

      // 🤖 BOT MOVE
      setTimeout(() => {
        const botRoll = Math.floor(Math.random() * 6) + 1;
        if (botRoll >= 4) {
          Alert.alert('❌ BOT WINS');
          setPosition(0);
        }
        setTurn('USER');
      }, 1000);

    }, 600);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 LUDO MVP</Text>

      <LudoBoard position={position} />

      <LudoDice onRoll={onDiceRoll} disabled={rolling} />

      <Text style={styles.turn}>Turn: {turn}</Text>
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
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  turn: {
    color: '#22c55e',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});