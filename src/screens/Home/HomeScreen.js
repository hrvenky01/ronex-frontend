import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

const MOCK_DATA = [
  {
    id: '1',
    title: 'Lucky Dice',
    entry: 20,
    live: true,
    image: 'https://i.imgur.com/7UQxYQZ.png',
  },
  {
    id: '2',
    title: 'Color Prediction',
    entry: 10,
    live: false,
    image: 'https://i.imgur.com/Yz8fZQm.png',
  },
];

export default function HomeScreen() {

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      {item.live && <Text style={styles.liveBadge}>LIVE</Text>}

      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.entry}>Entry: {item.entry} Coins</Text>

        <TouchableOpacity style={styles.joinBtn}>
          <Text style={styles.joinText}>JOIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Wallet Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>RONEX</Text>
        <Text style={styles.wallet}>💰 120 Coins</Text>
      </View>

      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
  },

  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  wallet: {
    color: '#FFD700',
    fontSize: 16,
  },

  card: {
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 350,
  },

  liveBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    fontSize: 12,
  },

  info: {
    padding: 15,
  },

  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  entry: {
    color: '#aaa',
    marginVertical: 6,
  },

  joinBtn: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },

  joinText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
}