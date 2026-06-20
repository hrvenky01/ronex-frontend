import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { getTransactions } from '../../services/walletApi';

export default function TransactionsScreen() {
  const userId = 1; // 🔴 later auth nundi

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const res = await getTransactions(userId);
      setTransactions(res.data);
    } catch (e) {
      console.log('Transaction load error', e);
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
      <Text style={styles.title}>Transactions</Text>

      {transactions.length === 0 ? (
        <Text style={styles.empty}>No transactions found</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View>
                <Text style={styles.source}>{item.source}</Text>
                <Text style={styles.type}>
                  {item.type} • {formatDate(item.createdAt)}
                </Text>
              </View>

              <Text
                style={[
                  styles.amount,
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

const formatDate = date => {
  if (!date) return '';
  return new Date(date).toLocaleString();
};

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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderColor: '#1e293b',
  },
  source: {
    color: '#e5e7eb',
    fontWeight: '600',
  },
  type: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  amount: {
    fontWeight: '800',
    fontSize: 16,
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
    marginTop: 40,
  },
});