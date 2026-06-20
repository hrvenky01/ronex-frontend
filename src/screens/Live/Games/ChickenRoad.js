import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = 90;

const STEPS = [
  { label: '1.29x' },
  { label: '1.36x' },
  { label: '1.44x' },
  { label: '1.53x' },
  { label: '1.63x' },
  { label: '1.75x' },
  { label: '1.89x' },
];

export default function ChickenRoad() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState('Easy');

  const renderItem = ({ item, index }) => {
    const active = index === step;
    const passed = index < step;

    return (
      <View style={styles.column}>
        {/* MULTIPLIER */}
        <View
          style={[
            styles.multiplier,
            active && styles.activeMultiplier,
            passed && styles.passedMultiplier,
          ]}
        >
          <Text style={styles.multiplierText}>{item.label}</Text>
        </View>

        {/* ROAD */}
        <View style={styles.road} />

        {/* GATE */}
        <View style={styles.gate} />

        {/* CHICKEN */}
        {active && <Text style={styles.chicken}>🐔</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <Text style={styles.title}>CHICKEN ROAD</Text>
        <Text style={styles.balance}>999,999.41</Text>
      </View>

      {/* ROAD TRACK */}
      <FlatList
        data={STEPS}
        horizontal
        renderItem={renderItem}
        keyExtractor={(_, i) => i.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.track}
      />

      {/* BOTTOM PANEL */}
      <View style={styles.bottom}>
        <View style={styles.modeRow}>
          {['Easy', 'Medium', 'Hard'].map(m => (
            <TouchableOpacity
              key={m}
              style={[
                styles.modeBtn,
                mode === m && styles.modeActive,
              ]}
              onPress={() => setMode(m)}
            >
              <Text style={styles.modeText}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.cashOut}>
            <Text style={styles.cashText}>CASH OUT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.go}
            onPress={() =>
              setStep(s => (s < STEPS.length - 1 ? s + 1 : s))
            }
          >
            <Text style={styles.goText}>GO</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2235',
  },

  topBar: {
    padding: 16,
    backgroundColor: '#16192b',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  balance: {
    color: '#ffd166',
    fontWeight: 'bold',
  },

  track: {
    paddingVertical: 30,
    paddingHorizontal: 10,
  },

  column: {
    width: COLUMN_WIDTH,
    alignItems: 'center',
  },

  multiplier: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3a3f5c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeMultiplier: {
    backgroundColor: '#2ecc71',
  },
  passedMultiplier: {
    backgroundColor: '#4dabf7',
  },
  multiplierText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  road: {
    width: 6,
    height: 50,
    backgroundColor: '#555',
    marginVertical: 4,
  },

  gate: {
    width: 40,
    height: 18,
    backgroundColor: '#0b0e1a',
    borderRadius: 4,
  },

  chicken: {
    fontSize: 30,
    marginTop: 6,
  },

  bottom: {
    backgroundColor: '#16192b',
    padding: 16,
  },

  modeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeBtn: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#2b2f42',
    alignItems: 'center',
  },
  modeActive: {
    backgroundColor: '#ffd166',
  },
  modeText: {
    fontWeight: 'bold',
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  cashOut: {
    flex: 1,
    backgroundColor: '#f4a261',
    padding: 14,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cashText: {
    fontWeight: 'bold',
  },
  go: {
    flex: 1,
    backgroundColor: '#2ecc71',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  goText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});