import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getWallet, getTransactions } from '../../services/walletApi';

export default function WalletHomeScreen() {
  const navigation = useNavigation();

  const userId = 1; // 🔴 later auth nundi ravali

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const walletRes = await getWallet(userId);
      setBalance(walletRes.data.balance);

      const txRes = await getTransactions(userId);
      setTransactions(txRes.data.slice(0, 5)); // recent 5 only
    } catch (e) {
      console.log('Wallet load error', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wallet</Text>

      {/* BALANCE CARD */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balance}>💰 {balance}</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            navigation.navigate('WalletStack', {
              screen: 'GetCoins',
            })
          }
        >
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.addText}>Get Coins</Text>
        </TouchableOpacity>
      </View>

      {/* TRANSACTIONS */}
      <View style={styles.txHeader}>
        <Text style={styles.txTitle}>Recent Transactions</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WalletStack', {
              screen: 'Transactions',
            })
          }
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <Text style={styles.empty}>No transactions yet</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.txRow}>
              <Text style={styles.txSource}>{item.source}</Text>
              <Text
                style={[
                  styles.txAmount,
                  item.type === 'CREDIT'
                    ? styles.credit
                    : styles.debit,
                ]}
              >
                {item.type === 'CREDIT' ? '+' : '-'}
                {item.amount}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 16,
  },
  loader: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  balanceCard: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  balance: {
    color: '#22c55e',
    fontSize: 32,
    fontWeight: '800',
    marginVertical: 10,
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#ec4899',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '700',
  },
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  txTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  viewAll: {
    color: '#38bdf8',
  },
  txRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#1e293b',
  },
  txSource: {
    color: '#e5e7eb',
  },
  txAmount: {
    fontWeight: '700',
  },
  credit: {
    color: '#22c55e',
  },
  debit: {
    color: '#ef4444',
  },
  empty: {
    color: '#64748b',
    textAlign: 'center',
    marginTop: 30,
  },
});