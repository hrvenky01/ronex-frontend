import auth from '@react-native-firebase/auth';

/**
 * Send OTP to phone number
 * @param {string} phone - 10 digit mobile number
 */
export const sendOtp = async (phone) => {
  const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
  return confirmation; // confirmation object
};

/**
 * Verify OTP and get Firebase ID Token
 * @param confirmation
 * @param otp
 */
export const verifyOtp = async (confirmation, otp) => {
  const userCredential = await confirmation.confirm(otp);
  const firebaseToken = await userCredential.user.getIdToken(true);
  return firebaseToken;
};