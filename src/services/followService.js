import api from './api';

// Follow user
export const followUser = async (userId) => {
  return api.post(`/follow/${userId}`);
};

// Unfollow user
export const unfollowUser = async (userId) => {
  return api.delete(`/follow/${userId}`);
};

// Get followers
export const getFollowers = async (userId) => {
  return api.get(`/followers/${userId}`);
};

// Get following
export const getFollowing = async (userId) => {
  return api.get(`/following/${userId}`);
};