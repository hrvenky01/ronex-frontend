import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

export default function Games({ navigation }) {
  const GameCard = ({ title, emoji, screen }) => (
    <Pressable
      onPress={() => navigation.navigate(screen)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <Text style={styles.cardText}>
        {emoji} {title}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Games Hub</Text>

      <GameCard title="Greedy Wheel" emoji="🎡" screen="GreedyWheel" />
      <GameCard title="777 Slot Game" emoji="🎰" screen="SevenSevenSeven" />
      <GameCard title="Chicken Road" emoji="🐔" screen="ChickenRoad" />
      <GameCard title="Mini Roulette" emoji="🎡" screen="MiniRoulette" />
      <GameCard title="Ludo (Bot)" emoji="🎲" screen="LudoGame" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    paddingTop: 50,
  },

  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 30,
  },

  card: {
    width: '80%',
    padding: 18,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },

  cardPressed: {
    transform: [{ scale: 0.96 }],
    backgroundColor: '#273449',
  },

  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});