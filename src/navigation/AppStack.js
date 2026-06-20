import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeTabs from './HomeTabs';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
}