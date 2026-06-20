import React from 'react';
import { View, StyleSheet } from 'react-native';

const CELL = 24;

export default function LudoBoard() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.board}>

        {/* 🔴 RED HOME */}
        <View style={[styles.home, styles.red]}>
          <View style={styles.inner}>
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
          </View>
        </View>

        {/* 🟢 GREEN HOME */}
        <View style={[styles.home, styles.green]}>
          <View style={styles.inner}>
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
          </View>
        </View>

        {/* 🟡 YELLOW HOME */}
        <View style={[styles.home, styles.yellow]}>
          <View style={styles.inner}>
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
          </View>
        </View>

        {/* 🔵 BLUE HOME */}
        <View style={[styles.home, styles.blue]}>
          <View style={styles.inner}>
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
            <View style={styles.tokenSlot} />
          </View>
        </View>

        {/* ⭐ CENTER */}
        <View style={styles.center}>
          <View style={[styles.triangle, styles.redTri]} />
          <View style={[styles.triangle, styles.greenTri]} />
          <View style={[styles.triangle, styles.yellowTri]} />
          <View style={[styles.triangle, styles.blueTri]} />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  board: {
    width: CELL * 15,
    height: CELL * 15,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
  },

  home: {
    position: 'absolute',
    width: CELL * 6,
    height: CELL * 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  red: { top: 0, left: 0, backgroundColor: '#ef4444' },
  green: { top: 0, right: 0, backgroundColor: '#22c55e' },
  yellow: { bottom: 0, right: 0, backgroundColor: '#facc15' },
  blue: { bottom: 0, left: 0, backgroundColor: '#3b82f6' },

  inner: {
    width: CELL * 4,
    height: CELL * 4,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 6,
  },

  tokenSlot: {
    width: CELL,
    height: CELL,
    borderRadius: CELL / 2,
    borderWidth: 2,
    borderColor: '#000',
  },

  center: {
    position: 'absolute',
    top: CELL * 6,
    left: CELL * 6,
    width: CELL * 3,
    height: CELL * 3,
  },

  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  },

  redTri: {
    borderLeftWidth: CELL * 1.5,
    borderRightWidth: CELL * 1.5,
    borderBottomWidth: CELL * 1.5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ef4444',
    top: 0,
  },

  greenTri: {
    borderTopWidth: CELL * 1.5,
    borderBottomWidth: CELL * 1.5,
    borderLeftWidth: CELL * 1.5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#22c55e',
    right: 0,
  },

  yellowTri: {
    borderLeftWidth: CELL * 1.5,
    borderRightWidth: CELL * 1.5,
    borderTopWidth: CELL * 1.5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#facc15',
    bottom: 0,
  },

  blueTri: {
    borderTopWidth: CELL * 1.5,
    borderBottomWidth: CELL * 1.5,
    borderRightWidth: CELL * 1.5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3b82f6',
    left: 0,
  },
});