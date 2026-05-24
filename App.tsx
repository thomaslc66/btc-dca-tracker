import './src/lib/interop'; // ← en premier, avant tout le reste
import { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DatabaseProvider } from '@/providers/DatabaseProvider';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { BtcGoalProvider } from '@/contexts/BtcGoalContext';
import { I18nProvider } from '@/i18n';
import HomeScreen from '@/screens/HomeScreen';
import AddPurchaseScreen from '@/screens/AddPurchaseScreen';
import EditPurchaseScreen from '@/screens/EditPurchaseScreen';
import SettingsScreen from '@/screens/SettingsScreen';
import { PurchaseWithMetrics } from '@/types';

import './global.css';
import ImportCsvScreen from '@/screens/ImporCsvcreen';

type Screen = 'home' | 'add-purchase' | 'import-csv' | 'settings' | 'edit-purchase';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [editingPurchase, setEditingPurchase] = useState<PurchaseWithMetrics | null>(null);

  function handleEditPurchase(purchase: PurchaseWithMetrics) {
    setEditingPurchase(purchase);
    setScreen('edit-purchase');
  }

  return (
    <SafeAreaProvider>
      <DatabaseProvider>
        <CurrencyProvider>
          <BtcGoalProvider>
          <I18nProvider>
          <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            {screen === 'home' ? (
              <HomeScreen
                onAddPurchase={() => setScreen('add-purchase')}
                onImportCsv={() => setScreen('import-csv')}
                onOpenSettings={() => setScreen('settings')}
                onEditPurchase={handleEditPurchase}
              />
            ) : screen === 'add-purchase' ? (
              <AddPurchaseScreen onBack={() => setScreen('home')} onSaved={() => setScreen('home')} />
            ) : screen === 'import-csv' ? (
              <ImportCsvScreen
                onBack={() => setScreen('home')}
                onImported={() => setScreen('home')}
              />
            ) : screen === 'settings' ? (
              <SettingsScreen onBack={() => setScreen('home')} />
            ) : editingPurchase ? (
              <EditPurchaseScreen
                purchase={editingPurchase}
                onBack={() => setScreen('home')}
                onSaved={() => setScreen('home')}
              />
            ) : null}
          </View>
          </I18nProvider>
          </BtcGoalProvider>
        </CurrencyProvider>
      </DatabaseProvider>
    </SafeAreaProvider>
  );
}
