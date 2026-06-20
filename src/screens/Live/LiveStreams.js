import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LiveStreams() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📡 Live Streams</Text>
      <Text style={styles.sub}>Go live & watch streamers</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  sub: { color: '#aaa', marginTop: 8 },
});