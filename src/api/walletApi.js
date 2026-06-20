import { API } from './api'; // axios instance

// 🔹 Get wallet balance
export const getWallet = userId =>
  API.get(`/wallet/${userId}`);

// 🔹 Get wallet transactions
export const getTransactions = userId =>
  API.get(`/wallet/${userId}/transactions`);

// 🔹 Debit wallet (games)
export const debitWallet = ({ userId, amount, source }) =>
  API.post('/wallet/debit', {
    userId,
    amount,
    source,
  });

// 🔹 Credit wallet (wins / admin / purchase)
export const creditWallet = ({ userId, amount, source }) =>
  API.post('/wallet/credit', {
    userId,
    amount,
    source,
  });