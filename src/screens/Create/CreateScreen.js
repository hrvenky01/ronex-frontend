import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { API } from '../../services/api';

export default function CreateScreen() {

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📂 PICK VIDEO FROM GALLERY
  const pickVideo = () => {
    launchImageLibrary(
      {
        mediaType: 'video',
      },
      (res) => {
        if (res.didCancel) return;

        if (res.assets && res.assets.length > 0) {
          setVideo(res.assets[0]);
        }
      }
    );
  };

  // 🚀 UPLOAD TO BACKEND
  const uploadVideo = async () => {

    if (!video) {
      Alert.alert('Error', 'Please select a video');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', {
      uri: video.uri,
      type: video.type,
      name: video.fileName,
    });

    formData.append('userName', 'ronex_user');

    try {
      await API.post('/reels/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      Alert.alert('Success', 'Video uploaded');

      setVideo(null);

    } catch (err) {
      setLoading(false);
      console.log(err);
      Alert.alert('Error', 'Upload failed');
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>📤 Upload Reel</Text>

      {/* PICK VIDEO */}
      <TouchableOpacity style={styles.card} onPress={pickVideo}>
        <Ionicons name="videocam" size={40} color="#000" />
        <Text style={styles.text}>
          {video ? 'Video Selected ✔' : 'Pick Video from Gallery'}
        </Text>
      </TouchableOpacity>

      {/* UPLOAD BUTTON */}
      <TouchableOpacity style={styles.btn} onPress={uploadVideo}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Upload Reel</Text>
        )}
      </TouchableOpacity>

    </View>
  );

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
    color: '#555',
  },
  btn: {
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
  },
});
}