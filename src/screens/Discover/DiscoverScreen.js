import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TRENDING = [
  { id: '1', title: '🔥 IPL Highlights' },
  { id: '2', title: '🎬 Movie Clips' },
  { id: '3', title: '💃 Dance Reels' },
  { id: '4', title: '💰 Crypto News' },
];

const USERS = [
  { id: '1', name: 'user1' },
  { id: '2', name: 'user2' },
  { id: '3', name: 'user3' },
];

export default function DiscoverScreen() {
  const [query, setQuery] = useState('');
  const [following, setFollowing] = useState([]);

  const toggleFollow = (id) => {
    if (following.includes(id)) {
      setFollowing(following.filter((i) => i !== id));
    } else {
      setFollowing([...following, id]);
    }
  };

  const filteredUsers = USERS.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );

  const renderHeader = () => (
    <>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <Text style={styles.header}>🔍 Discover</Text>
        <Ionicons name="options-outline" size={22} color="#fff" />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          placeholder="Search reels, users..."
          placeholderTextColor="#777"
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
      </View>

      {/* TRENDING */}
      <Text style={styles.sectionTitle}>🔥 Trending</Text>

      <FlatList
        data={TRENDING}
        horizontal
        keyExtractor={(i) => i.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.trendingCard}>
            <Text style={styles.trendingText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* USERS TITLE */}
      <Text style={styles.sectionTitle}>👥 Suggested Users</Text>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredUsers}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => {
          const isFollowing = following.includes(item.id);

          return (
            <View style={styles.userCard}>
              <View>
                <Text style={styles.username}>@{item.name}</Text>
                <Text style={styles.subText}>Suggested for you</Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.followBtn,
                  isFollowing && { backgroundColor: '#555' },
                ]}
                onPress={() => toggleFollow(item.id)}
              >
                <Text style={styles.followText}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1117',
    padding: 15,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1d26',
    padding: 12,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#2a2d3a',
  },

  input: {
    marginLeft: 10,
    flex: 1,
    color: '#fff',
  },

  sectionTitle: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },

  trendingCard: {
    backgroundColor: '#1a1d26',
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2a2d3a',
  },

  trendingText: {
    color: '#fff',
    fontSize: 13,
  },

  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#1a1d26',
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2d3a',
  },

  username: {
    color: '#fff',
    fontWeight: 'bold',
  },

  subText: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },

  followBtn: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
  },

  followText: {
    color: '#000',
    fontWeight: 'bold',
  },
});