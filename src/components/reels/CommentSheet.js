import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const DUMMY_COMMENTS = [
  { id: '1', user: 'Ravi', text: '🔥 Super reel bro' },
  { id: '2', user: 'Sita', text: 'Nice editing 😍' },
  { id: '3', user: 'Kiran', text: 'Full vibe 💯' },
];

export default function CommentSheet({ visible, onClose }) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />

      <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.dragHandle} />
          <Text style={styles.title}>Comments</Text>
        </View>

        {/* Comment List */}
        <FlatList
          data={DUMMY_COMMENTS}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}
          renderItem={({ item }) => (
            <View style={styles.commentRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.user.charAt(0)}
                </Text>
              </View>
              <View style={styles.commentText}>
                <Text style={styles.username}>{item.user}</Text>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            </View>
          )}
        />

        {/* Input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Add a comment..."
              placeholderTextColor="#999"
              style={styles.input}
            />
            <TouchableOpacity>
              <Text style={styles.post}>Post</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    height: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  commentRow: {
    flexDirection: 'row',
    padding: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
  },
  commentText: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontWeight: '600',
  },
  text: {
    color: '#333',
    marginTop: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  post: {
    marginLeft: 12,
    color: '#0095f6',
    fontWeight: '600',
  },
});