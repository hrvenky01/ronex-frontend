import React from 'react';
import { View, Text } from 'react-native';

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 24 }}>
        RONEX SPLASH
      </Text>
    </View>
  );
}