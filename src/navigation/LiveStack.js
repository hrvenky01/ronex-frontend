import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LiveScreen from '../screens/Live/LiveScreen';
import Games from '../screens/Live/Games';

import GreedyWheel from '../screens/Live/Games/GreedyWheel';
import SevenSevenSeven from '../screens/Live/Games/SevenSevenSeven';
import LudoGame from '../screens/Live/Games/Ludo/LudoGame';
import ChickenRoad from '../screens/Live/Games/ChickenRoad';
import MiniRoulette from '../screens/Live/Games/MiniRoulette';

import Leaderboard from '../screens/Live/Leaderboard';
import FriendZone from '../screens/Live/FriendZone';


const Stack = createNativeStackNavigator();

export default function LiveStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="LiveHome" component={LiveScreen} />
      <Stack.Screen name="Games" component={Games} />

          {/* Games */}
      <Stack.Screen name="GreedyWheel" component={GreedyWheel} />
      <Stack.Screen name="SevenSevenSeven" component={SevenSevenSeven} />
      <Stack.Screen name="LudoGame" component={LudoGame} />
       <Stack.Screen name="ChickenRoad" component={ChickenRoad} />
       <Stack.Screen name="MiniRoulette" component={MiniRoulette} />



        {/* 🏆 Leaderboard FIX */}
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
         <Stack.Screen name="FriendZone" component={FriendZone} />

    </Stack.Navigator>
  );
}