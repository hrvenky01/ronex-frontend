import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'ronex_token';
const USER_KEY = 'ronex_user';

// 💾 Save login data
export const saveLoginData = async (data) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, data.token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
  } catch (e) {
    console.log('Save error:', e);
  }
};

// 📥 Get token
export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

// 📥 Get user
export const getUser = async () => {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

// ❌ Logout
export const clearStorage = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
};