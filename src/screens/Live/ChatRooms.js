import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connectChat, sendMessage } from '../../services/ChatService';

export default function ChatRooms() {

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    connectChat((msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const handleSend = () => {
    const msg = {
      sender: 'Venkat',
      message: text,
      roomId: 'global',
      type: 'CHAT'
    };

    sendMessage(msg);
    setText('');
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={messages}
        keyExtractor={(i, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.msg}>
            {item.sender}: {item.message}
          </Text>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type message..."
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSend}>
          <Text style={styles.send}>Send</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#000' },
  msg: { color: '#fff', padding: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  send: {
    color: '#0af',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});


import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import ChatSocket from '../services/ChatSocket';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    ChatSocket.connect((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    ChatSocket.joinRoom({
      sender: 'Venkat',
      type: 'JOIN',
    });
  }, []);

  const send = () => {
    ChatSocket.sendMessage({
      sender: 'Venkat',
      content: text,
      type: 'CHAT',
    });

    setText('');
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>

      <FlatList
        data={messages}
        keyExtractor={(i, idx) => idx.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.sender}: {item.content}
          </Text>
        )}
      />

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Type message"
      />

      <Button title="Send" onPress={send} />

    </View>
  );
}