import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { popIn } from './animations';

export default function Token({ color, x, y }) {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    popIn(scale).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.token,
        {
          backgroundColor: color,
          transform: [
            { translateX: x },
            { translateY: y },
            { scale },
          ],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  token: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#000',
    position: 'absolute',
  },
});