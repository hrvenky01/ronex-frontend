import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

export default function UploadScreen() {
  const [video, setVideo] = useState(null);

  const pickFromGallery = () => {
    launchImageLibrary(
      { mediaType: 'video', quality: 1 },
      response => {
        if (response.didCancel) return;

        if (response.assets && response.assets.length > 0) {
          setVideo(response.assets[0]);
        }
      }
    );
  };

  const openCamera = () => {
    launchCamera(
      { mediaType: 'video', saveToPhotos: true },
      response => {
        if (response.didCancel) return;

        if (response.assets && response.assets.length > 0) {
          setVideo(response.assets[0]);
        }
      }
    );
  };

  const upload = () => {
    if (!video) {
      Alert.alert('Select video first');
      return;
    }

    Alert.alert('Uploading...', video.fileName || 'Video');
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Upload Reel</Text>

      {video && (
        <View style={styles.preview}>
          <Text style={styles.fileName}>
            🎥 {video.fileName || 'Selected Video'}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.btn} onPress={pickFromGallery}>
        <Text style={styles.btnText}>Pick from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={openCamera}>
        <Text style={styles.btnText}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.uploadBtn]} onPress={upload}>
        <Text style={styles.btnText}>Upload Reel</Text>
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
    padding: 15,
    backgroundColor: '#eee',
    marginBottom: 20,
    borderRadius: 10,
  },

  fileName: {
    fontSize: 14,
  },

  btn: {
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
    textAlign: 'center',
    fontWeight: '600',
  },
});