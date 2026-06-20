import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import { API } from '../../services/api';

const { height } = Dimensions.get('window');

export default function FriendZone() {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['60%'], []);

  const [posts, setPosts] = useState([]);
  const [selectedReel, setSelectedReel] = useState(null);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      const res = await API.get('/friends/feed');
      setPosts(res.data || []);
    } catch (err) {
      console.log('Friend feed error:', err);
      setPosts([]);
    }
  };

  const openComments = (reel) => {
    setSelectedReel(reel);
    bottomSheetRef.current?.snapToIndex(0);
  };

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        windowSize={5}
        removeClippedSubviews
        renderItem={({ item }) => (
          <ReelItem item={item} onCommentPress={openComments} />
        )}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: '#111' }}
      >
        <CommentsSheet reel={selectedReel} />
      </BottomSheet>
    </>
  );
}

/* ---------------- REEL ITEM ---------------- */

function ReelItem({ item, onCommentPress }) {
  return (
    <View style={styles.reelContainer}>
      <Image
        source={{ uri: item.avatar || 'https://i.pravatar.cc/150' }}
        style={styles.bg}
      />

      <View style={styles.actions}>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onCommentPress(item)}>
          <Ionicons name="chatbubble-outline" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomInfo}>
        <Text style={styles.username}>{item.userName}</Text>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    </View>
  );
}

/* ---------------- COMMENTS ---------------- */

function CommentsSheet({ reel }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.commentsTitle}>
        Comments {reel ? `• ${reel.userName}` : ''}
      </Text>

      <Text style={{ color: '#aaa', padding: 16 }}>
        🔥 Backend comments API connect next step
      </Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  reelContainer: {
    height,
    backgroundColor: '#000',
  },

  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  actions: {
    position: 'absolute',
    right: 15,
    bottom: 120,
  },

  bottomInfo: {
    position: 'absolute',
    bottom: 40,
    left: 15,
  },

  username: {
    color: '#fff',
    fontWeight: 'bold',
  },

  caption: {
    color: '#ddd',
    marginTop: 4,
  },

  commentsTitle: {
    color: '#fff',
    fontSize: 16,
    padding: 16,
    fontWeight: 'bold',
  },
});