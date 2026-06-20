import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LeaderboardScreen() {
  const [data, setData] = useState([]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const podiumAnim = useRef(new Animated.Value(0)).current;

  // 👉 store animated values for list items
  const animValues = useRef({}).current;

  useEffect(() => {
    setTimeout(() => {
      const users = [
        { id: '1', username: 'KingA', score: 9800 },
        { id: '2', username: 'QueenB', score: 8700 },
        { id: '3', username: 'PlayerC', score: 8200 },
        { id: '4', username: 'Venkat', score: 7600 },
        { id: '5', username: 'UserE', score: 7200 },
        { id: '6', username: 'UserF', score: 6900 },
      ];

      setData(users);

      users.forEach((item, index) => {
        animValues[item.id] = new Animated.Value(0);

        Animated.timing(animValues[item.id], {
          toValue: 1,
          duration: 400 + index * 120,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }).start();
      });

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(podiumAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }, []);

  const top3 = data.slice(0, 3);
  const others = data.slice(3);

  const renderItem = ({ item, index }) => {
    const anim = animValues[item.id] || new Animated.Value(1);

    return (
      <Animated.View
        style={[
          styles.row,
          {
            opacity: anim,
            transform: [
              {
                scale: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.rank}>#{index + 4}</Text>

        <View style={styles.avatar}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {item.username[0]}
          </Text>
        </View>

        <Text style={styles.name}>{item.username}</Text>

        <Text style={styles.score}>{item.score}</Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

      {/* HEADER */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.header}>🏆 Ronex Leaderboard</Text>
      </Animated.View>

      {/* PODIUM */}
      <Animated.View
        style={[
          styles.podium,
          {
            transform: [
              {
                scale: podiumAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
      >
        {top3[1] && (
          <View style={styles.podiumItem}>
            <Ionicons name="trophy" size={30} color="#C0C0C0" />
            <Text style={styles.podiumName}>{top3[1].username}</Text>
            <Text style={styles.podiumScore}>{top3[1].score}</Text>
          </View>
        )}

        {top3[0] && (
          <View style={[styles.podiumItem, styles.first]}>
            <Ionicons name="trophy" size={40} color="#FFD700" />
            <Text style={styles.podiumName}>{top3[0].username}</Text>
            <Text style={styles.podiumScore}>{top3[0].score}</Text>
          </View>
        )}

        {top3[2] && (
          <View style={styles.podiumItem}>
            <Ionicons name="trophy" size={30} color="#CD7F32" />
            <Text style={styles.podiumName}>{top3[2].username}</Text>
            <Text style={styles.podiumScore}>{top3[2].score}</Text>
          </View>
        )}
      </Animated.View>

      {/* LIST */}
      <FlatList
        data={others}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    paddingHorizontal: 15,
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 15,
    textAlign: 'center',
  },

  podium: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 20,
  },

  podiumItem: {
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    padding: 10,
    borderRadius: 12,
    width: 100,
  },

  first: {
    backgroundColor: '#2a2a2a',
  },

  podiumName: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },

  podiumScore: {
    color: '#FFD700',
    marginTop: 2,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginVertical: 5,
    padding: 12,
    borderRadius: 10,
  },

  rank: {
    color: '#fff',
    width: 40,
    fontWeight: 'bold',
  },

  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  name: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },

  score: {
    color: '#00ff99',
    fontWeight: 'bold',
  },
});