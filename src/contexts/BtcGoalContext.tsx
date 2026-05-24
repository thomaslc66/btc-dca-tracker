import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { useDatabase } from '@/providers/DatabaseProvider';

type BtcGoalContextValue = {
  btcGoal: number | null;
  setBtcGoal: (goal: number | null) => Promise<void>;
};

const BtcGoalContext = createContext<BtcGoalContextValue | null>(null);

export function useBtcGoal() {
  const ctx = useContext(BtcGoalContext);
  if (!ctx) throw new Error('useBtcGoal must be used within BtcGoalProvider');
  return ctx;
}

export function BtcGoalProvider({ children }: PropsWithChildren) {
  const db = useDatabase();
  const [btcGoal, setBtcGoalState] = useState<number | null>(null);

  useEffect(() => {
    db.getFirstAsync<{ value: string }>(
      "SELECT value FROM settings WHERE key = 'btc_goal'"
    ).then((row) => {
      if (row?.value) setBtcGoalState(parseFloat(row.value));
    });
  }, [db]);

  const setBtcGoal = useCallback(
    async (goal: number | null) => {
      if (goal === null || goal <= 0) {
        await db.runAsync("DELETE FROM settings WHERE key = 'btc_goal'");
        setBtcGoalState(null);
      } else {
        await db.runAsync(
          "INSERT OR REPLACE INTO settings (key, value) VALUES ('btc_goal', ?)",
          String(goal)
        );
        setBtcGoalState(goal);
      }
    },
    [db]
  );

  return (
    <BtcGoalContext.Provider value={{ btcGoal, setBtcGoal }}>
      {children}
    </BtcGoalContext.Provider>
  );
}
