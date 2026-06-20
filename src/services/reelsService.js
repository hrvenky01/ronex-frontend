import API from './api';

export const getReels = () => API.get('/reels');

export const likeReel = (reelId, userId) =>
  API.post(`/reels/like/${reelId}?userId=${userId}`);

export const getComments = (reelId) =>
  API.get(`/reels/comment/${reelId}`);

export const addComment = (data) =>
  API.post('/reels/comment', data);

export const uploadReel = (formData) =>
  API.post('/reels/upload-video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });