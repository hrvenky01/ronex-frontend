import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login/Login';
import OtpVerify from '../pages/Login/OtpVerify';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpVerify" component={OtpVerify} />
    </Stack.Navigator>
  );
}