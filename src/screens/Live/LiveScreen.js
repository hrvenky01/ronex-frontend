import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LiveScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('friends');

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <Text style={styles.header}>📡 Live Hub</Text>

      {/* TOP TABS */}
      <View style={styles.tabRow}>

        <TabBtn
          title="👥 Friends"
          active={activeTab === 'friends'}
          onPress={() => setActiveTab('friends')}
        />

        <TabBtn
          title="💬 Chat"
          active={activeTab === 'chat'}
          onPress={() => setActiveTab('chat')}
        />

        <TabBtn
          title="🎮 Games"
          active={activeTab === 'games'}
          onPress={() => {
            setActiveTab('games');
            navigation.navigate('Games');
          }}
        />

        <TabBtn
          title="🏆 Leaderboard"
          active={activeTab === 'leaderboard'}
          onPress={() => {
            setActiveTab('leaderboard');
            navigation.navigate('Leaderboard');   // 👈 IMPORTANT
          }}
        />

        <TabBtn
          title="📡 Live"
          active={activeTab === 'live'}
          onPress={() => setActiveTab('live')}
        />

      </View>

      {/* CONTENT */}
      <View style={styles.center}>
        {activeTab === 'friends' && <Text>👥 Friend Zone</Text>}
        {activeTab === 'chat' && <Text>💬 Chat Rooms</Text>}
        {activeTab === 'games' && <Text>🎮 Opening Games...</Text>}
        {activeTab === 'leaderboard' && <Text>🏆 Opening Leaderboard...</Text>}
        {activeTab === 'live' && <Text>📡 Live Streams Coming Soon</Text>}
      </View>

    </View>
  );
}

/* ---------- TAB BUTTON ---------- */
function TabBtn({ title, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabBtn, active && styles.tabActive]}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',   // 🔥 dark theme (better for Ronex)
    paddingTop: 50,
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: '#eb0c0c',
  },

  tabRow: {
    flexDirection: 'row',
    marginTop: 15,
    paddingHorizontal: 10,
  },

  tabBtn: {
    flex: 1,
    padding: 10,
    margin: 4,
    borderRadius: 10,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
  },

  tabActive: {
    backgroundColor: '#4711db',
  },

  tabText: {
    fontSize: 11,
    color: '#aaa',
  },

  tabTextActive: {
    color: '#e6e3e3',
    fontWeight: 'bold',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});