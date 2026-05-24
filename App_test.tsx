import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DatabaseProvider } from '@/providers/DatabaseProvider';
import HomeScreen from 'src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <DatabaseProvider>
        <StatusBar style="light" />
        <HomeScreen />
      </DatabaseProvider>
    </SafeAreaProvider>
  );
}
