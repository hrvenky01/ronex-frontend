import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  Share,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { clearStorage } from '../../utils/storage';

const reels = Array.from({ length: 12 }, (_, i) => i + 1);

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/150');

  // 🔥 TEMP (later backend nundi vastundi)
  const referralCode = 'RXA9K2';

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, res => {
      if (res?.assets?.length) {
        setAvatar(res.assets[0].uri);
      }
    });
  };

  const toggleFollow = () => {
    setFollowers(f => (isFollowing ? f - 1 : f + 1));
    setIsFollowing(!isFollowing);
  };

  const shareReferral = async () => {
    try {
      await Share.share({
        message: `Join Ronex using my referral code: ${referralCode}`,
      });
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await clearStorage();
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.username}>@ronex_user</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#f43f5e" />
        </TouchableOpacity>
      </View>

      {/* PROFILE */}
      <View style={styles.profileRow}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={14} color="#fff" />
          </View>
        </TouchableOpacity>

        <View style={styles.stats}>
          <Stat label="Reels" value="0" />
          <Stat label="Followers" value={followers} />
          <Stat label="Coins" value="0" />
        </View>
      </View>

      <Text style={styles.name}>Ronex Player</Text>

      {/* 🔥 REFERRAL CODE */}
      <View style={styles.referralBox}>
        <View>
          <Text style={styles.refLabel}>My Referral Code</Text>
          <Text style={styles.refCode}>{referralCode}</Text>
        </View>

        <TouchableOpacity style={styles.copyBtn} onPress={shareReferral}>
          <Ionicons name="share-social-outline" size={18} color="#0f172a" />
          <Text style={styles.copyText}>SHARE</Text>
        </TouchableOpacity>
      </View>

      {/* ACTIONS */}
      <View style={styles.actionRow}>
        <ActionBtn icon="game-controller" label="Games" onPress={() => navigation.navigate('Live')} />
        <ActionBtn icon="wallet" label="Wallet" onPress={() => navigation.navigate('WalletStack', { screen: 'Wallet' })} />
        <ActionBtn icon="logo-bitcoin" label="Get Coins" onPress={() => navigation.navigate('WalletStack', { screen: 'GetCoins' })} />
      </View>

      {/* FOLLOW */}
      <TouchableOpacity
        onPress={toggleFollow}
        style={[styles.followBtn, isFollowing && styles.followingBtn]}
      >
        <Text style={[styles.followText, isFollowing && { color: '#0f172a' }]}>
          {isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>

      {/* GRID */}
      <FlatList
        data={reels}
        numColumns={3}
        keyExtractor={i => i.toString()}
        renderItem={() => <View style={styles.box} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}

/* COMPONENTS */

const Stat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const ActionBtn = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#38bdf8" />
    <Text style={styles.actionText}>{label}</Text>
  </TouchableOpacity>
);

/* STYLES */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', paddingHorizontal: 16 },
  header: { paddingVertical: 16, flexDirection: 'row', justifyContent: 'space-between' },
  username: { color: '#fff', fontSize: 18, fontWeight: '700' },

  profileRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 84, height: 84, borderRadius: 42, borderWidth: 2, borderColor: '#38bdf8' },
  cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#ec4899', padding: 6, borderRadius: 20 },

  stats: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 16, fontWeight: '700' },
  statLabel: { color: '#94a3b8', fontSize: 12 },

  name: { marginTop: 12, color: '#fff', fontSize: 16, fontWeight: '600' },

  referralBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refLabel: { color: '#94a3b8', fontSize: 12 },
  refCode: { color: '#38bdf8', fontSize: 18, fontWeight: '800' },

  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#38bdf8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  copyText: { marginLeft: 4, fontWeight: '800', color: '#0f172a', fontSize: 12 },

  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  actionBtn: { flex: 1, marginHorizontal: 4, paddingVertical: 12, borderWidth: 1, borderColor: '#1e293b', borderRadius: 10, alignItems: 'center' },
  actionText: { marginTop: 4, color: '#38bdf8', fontSize: 12, fontWeight: '700' },

  followBtn: { marginTop: 14, paddingVertical: 10, borderRadius: 8, backgroundColor: '#ec4899', alignItems: 'center' },
  followingBtn: { backgroundColor: '#e5e7eb' },
  followText: { fontWeight: '700', color: '#fff' },

  box: { flex: 1, aspectRatio: 1, backgroundColor: '#1e293b', margin: 1, borderRadius: 4 },
});