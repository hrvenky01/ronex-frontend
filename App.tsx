import { Text, View } from 'react-native';

function AppContent() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        RONEX App Started 🚀
      </Text>
    </View>
  );
}

export default function App() {
  return <AppContent />;
}