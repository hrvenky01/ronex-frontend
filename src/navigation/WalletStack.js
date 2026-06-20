import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WalletHomeScreen from '../screens/Wallet/WalletHomeScreen';
import GetCoinsScreen from '../screens/Wallet/GetCoinsScreen';
import TransactionsScreen from '../screens/Wallet/TransactionsScreen';

const Stack = createNativeStackNavigator();

export default function WalletStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Wallet" component={WalletHomeScreen} />
      <Stack.Screen name="GetCoins" component={GetCoinsScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
    </Stack.Navigator>
  );
}