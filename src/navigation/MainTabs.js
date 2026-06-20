import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FeedScreen from '../screens/Feed/FeedScreen';
import DiscoverScreen from '../screens/Discover/DiscoverScreen';
import CreateScreen from '../screens/Upload/UploadScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import LiveStack from './LiveStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fff',
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === 'Home')
            iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Discover')
            iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Create')
            iconName = 'add-circle';
          else if (route.name === 'Live')
            iconName = focused ? 'radio' : 'radio-outline';
          else if (route.name === 'Profile')
            iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={FeedScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Live" component={LiveStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}