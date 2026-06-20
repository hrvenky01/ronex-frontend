import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';

import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommentSheet from '../../components/reels/CommentSheet';
import { API } from '../../services/api';

const { height } = Dimensions.get('window');

export default function FeedScreen() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [liked, setLiked] = useState({});
  const [mutedMap, setMutedMap] = useState({});
  const [selectedReel, setSelectedReel] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0)).current;

  /* ---------------- LOAD REELS ---------------- */
  useEffect(() => {
    loadReels();
  }, []);

  const loadReels = async () => {
    try {
      setLoading(true);

      const res = await API.get('/reels');

      const formatted = res.data.map(item => ({
        id: item.id.toString(),
        video: item.videoUrl,
        user: item.userName,
        likes: item.likes || 0,
      }));

      setReels(formatted);
    } catch (err) {
      console.log('Reels load error:', err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LIKE HANDLER ---------------- */
  const handleLike = async (id) => {
    try {
      await API.post(`/reels/like/${id}?userId=1`);

      setLiked(prev => ({
        ...prev,
        [id]: !prev[id],
      }));

      scaleAnim.setValue(0);
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } catch (err) {
      console.log('Like error:', err);
    }
  };

  /* ---------------- VIEW TRACK ---------------- */
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  /* ---------------- RENDER ITEM ---------------- */
  const renderItem = useCallback(
    ({ item, index }) => {
      const isActive = index === activeIndex;

      return (
        <View style={{ height, backgroundColor: '#000' }}>
          {/* VIDEO */}
          <Video
            source={{ uri: item.video }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            repeat
            paused={!isActive}
            muted={!!mutedMap[item.id]}
          />

          {/* HEART ANIMATION */}
          {liked[item.id] && (
            <Animated.View
              style={{
                position: 'absolute',
                top: '45%',
                left: '45%',
                transform: [{
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 2.5],
                  }),
                }],
              }}
            >
              <Ionicons name="heart" size={80} color="red" />
            </Animated.View>
          )}

          {/* RIGHT ACTIONS */}
          <View style={{ position: 'absolute', right: 15, bottom: 120 }}>
            <TouchableOpacity onPress={() => handleLike(item.id)}>
              <Ionicons
                name={liked[item.id] ? 'heart' : 'heart-outline'}
                size={32}
                color={liked[item.id] ? 'red' : '#fff'}
              />
            </TouchableOpacity>

            <Text style={{ color: '#fff', marginVertical: 4 }}>
              {item.likes + (liked[item.id] ? 1 : 0)}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setSelectedReel(item);
                setShowComments(true);
              }}
            >
              <Ionicons
                name="chatbubble-outline"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 12 }}
              onPress={() =>
                setMutedMap(prev => ({
                  ...prev,
                  [item.id]: !prev[item.id],
                }))
              }
            >
              <Ionicons
                name={mutedMap[item.id]
                  ? 'volume-mute'
                  : 'volume-high'}
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* USER INFO */}
          <View style={{ position: 'absolute', bottom: 60, left: 15 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              @{item.user}
            </Text>
          </View>
        </View>
      );
    },
    [activeIndex, liked, mutedMap]
  );

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={reels}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews
        maxToRenderPerBatch={2}
        windowSize={3}
        initialNumToRender={1}
      />

      <CommentSheet
        visible={showComments}
        reel={selectedReel}
        onClose={() => setShowComments(false)}
      />
    </View>
  );
}