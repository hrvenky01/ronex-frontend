import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export default function UploadScreen() {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickFromGallery = () => {
    launchImageLibrary({ mediaType: 'video' }, response => {
      if (response.didCancel) return;
      if (response.assets?.length) {
        setVideo(response.assets[0]);
      }
    });
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'video', saveToPhotos: true }, response => {
      if (response.didCancel) return;
      if (response.assets?.length) {
        setVideo(response.assets[0]);
      }
    });
  };

  const upload = async () => {
    if (!video) {
      Alert.alert('Select video first');
      return;
    }

    const formData = new FormData();

    // 🔥 MUST BE "file" (backend expects this)
    formData.append('file', {
      uri: video.uri,
      type: video.type || 'video/mp4',
      name: video.fileName || 'reel.mp4',
    });

    // 🔥 MUST SEND userName
    formData.append('userName', 'RonexUser');

    try {
      setUploading(true);

      const res = await fetch(
        'http://YOUR_PC_IP:8080/api/reels/upload-video',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      console.log('UPLOAD SUCCESS:', data);

      Alert.alert('Success ✅', 'Reel uploaded successfully');
      setVideo(null);

    } catch (e) {
      console.log(e);
      Alert.alert('Upload Failed ❌', e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Upload Reel</Text>

      {video && (
        <View style={styles.preview}>
          <Ionicons name="videocam" size={20} />
          <Text style={styles.fileName}>
            {video.fileName || 'Selected Video'}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.btn} onPress={pickFromGallery}>
        <Ionicons name="images" size={20} color="#fff" />
        <Text style={styles.btnText}>Pick from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={openCamera}>
        <Ionicons name="camera" size={20} color="#fff" />
        <Text style={styles.btnText}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.uploadBtn]}
        onPress={upload}
        disabled={uploading}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="cloud-upload" size={20} color="#fff" />
            <Text style={styles.btnText}>Upload Reel</Text>
          </>
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#eee',
    marginBottom: 20,
    borderRadius: 10,
  },
  fileName: {
    marginLeft: 10,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  uploadBtn: {
    backgroundColor: 'green',
  },
  btnText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});