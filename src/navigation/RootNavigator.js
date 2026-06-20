import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Auth/Login';
import OtpScreen from '../screens/Auth/OtpScreen';
import MainTabs from './MainTabs';
import WalletStack from './WalletStack'; // ✅ IMPORTANT import

const Stack = createNativeStackNavigator();

export default function RootNavigator({ initialRouteName }) {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />

      {/* Wallet flows outside tabs */}
      <Stack.Screen name="WalletStack" component={WalletStack} />
    </Stack.Navigator>
  );
}