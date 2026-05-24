// providers/DatabaseProvider.tsx
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';
import { migrateDbIfNeeded } from '@/db/migrations';
import { LoadingScreen } from '@/components/LoadingScreen';

const DatabaseContext = createContext<SQLiteDatabase | null>(null);

export function useDatabase() {
  const db = useContext(DatabaseContext);
  if (!db) throw new Error('useDatabase must be used within DatabaseProvider');
  return db;
}

export function DatabaseProvider({ children }: PropsWithChildren) {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  useEffect(() => {
    openDatabaseAsync('dca-btc-tracker.db').then(async (database) => {
      await migrateDbIfNeeded(database);
      setDb(database);
    });
  }, []);

  if (!db) {
    return <LoadingScreen />;
  }

  return <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>;
}
