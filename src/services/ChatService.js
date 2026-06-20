// src/services/ChatService.js
import SockJS from 'sockjs-client';
import { Client } from 'stompjs';

let stompClient = null;

export const connectChat = (onMessage) => {
  const socket = new SockJS('https://ronex-backend.onrender.com/ws');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe('/topic/room', (msg) => {
      onMessage(JSON.parse(msg.body));
    });
  });
};

export const sendMessage = (message) => {
  if (stompClient) {
    stompClient.send('/app/chat.send', {}, JSON.stringify(message));
  }
};