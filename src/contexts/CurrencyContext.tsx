import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useDatabase } from '@/providers/DatabaseProvider';

type CurrencyContextValue = {
  displayCurrency: string;
  setDisplayCurrency: (currency: string) => Promise<void>;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}

export function CurrencyProvider({ children }: PropsWithChildren) {
  const db = useDatabase();
  const [displayCurrency, setDisplayCurrencyState] = useState('CHF');

  useEffect(() => {
    db.getFirstAsync<{ value: string }>(
      "SELECT value FROM settings WHERE key = 'display_currency'"
    ).then((row) => {
      if (row?.value) setDisplayCurrencyState(row.value);
    });
  }, [db]);

  const setDisplayCurrency = useCallback(
    async (currency: string) => {
      await db.runAsync(
        "INSERT OR REPLACE INTO settings (key, value) VALUES ('display_currency', ?)",
        currency
      );
      setDisplayCurrencyState(currency);
    },
    [db]
  );

  return (
    <CurrencyContext.Provider value={{ displayCurrency, setDisplayCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
