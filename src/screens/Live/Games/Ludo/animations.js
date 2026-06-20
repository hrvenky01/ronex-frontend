import { Animated, Easing } from 'react-native';

export const popIn = (value) => {
  value.setValue(0);
  return Animated.spring(value, {
    toValue: 1,
    friction: 4,
    useNativeDriver: true,
  });
};

export const pulse = (value) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1.1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ])
  ).start();
};

export const moveStep = (value, to) =>
  Animated.timing(value, {
    toValue: to,
    duration: 250,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  });