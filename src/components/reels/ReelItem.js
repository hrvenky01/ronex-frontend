import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder } from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function ReelItem({ item, isActive, commentRef }) {

  const navigation = useNavigation();

  const [liked, setLiked] = useState(false);
  const scale = useRef(new Animated.Value(0)).current;

  // ❤️ DOUBLE TAP LIKE
  const onLike = () => {
    setLiked(!liked);

    scale.setValue(0);
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scale, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  // 👈 SWIPE LEFT → PROFILE
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 60,
      onPanResponderRelease: (_, g) => {
        if (g.dx < -80) navigation.navigate('Profile');
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers} style={{ height: '100%' }}>

      {/* VIDEO */}
      <Video
        source={{ uri: item.video }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        repeat
        paused={!isActive}
      />

      {/* ❤️ BIG HEART ANIMATION */}
      {liked && (
        <Animated.View
          style={{
            position: 'absolute',
            top: '45%',
            left: '45%',
            transform: [{
              scale: scale.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 2.5],
              })
            }]
          }}
        >
          <Ionicons name="heart" size={90} color="red" />
        </Animated.View>
      )}

      {/* RIGHT ACTIONS */}
      <View style={{
        position: 'absolute',
        right: 15,
        bottom: 120
      }}>

        <TouchableOpacity onPress={onLike}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={32}
            color={liked ? 'red' : '#fff'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => commentRef.current?.snapToIndex(1)}>
          <Ionicons name="chatbubble-outline" size={30} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="share-social-outline" size={30} color="#fff" />
        </TouchableOpacity>

      </View>

      {/* USER */}
      <View style={{
        position: 'absolute',
        bottom: 60,
        left: 15
      }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          @{item.user}
        </Text>
      </View>

    </View>
  );
}