import { useMemo } from 'react';
import { Purchase } from '@/types';
import { useDatabase } from '@/providers/DatabaseProvider';

export function usePurchasesRepository() {
  const db = useDatabase();
  return useMemo(() => {
    async function listPurchases(): Promise<Purchase[]> {
      return db.getAllAsync<Purchase>('SELECT * FROM purchases ORDER BY boughtAt DESC');
    }

    async function addPurchase(input: Omit<Purchase, 'id'>) {
      await db.runAsync(
        `INSERT INTO purchases (
          boughtAt,
          amount,
          buyPrice,
          btcAmount,
          fee,
          currency,
          note
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        input.boughtAt,
        input.amount,
        input.buyPrice,
        input.btcAmount,
        input.fee,
        input.currency,
        input.note ?? null
      );
    }

    async function deletePurchase(id: number) {
      await db.runAsync('DELETE FROM purchases WHERE id = ?', id);
    }

    async function updatePurchase(id: number, input: Omit<Purchase, 'id'>) {
      await db.runAsync(
        `UPDATE purchases SET
          boughtAt = ?,
          amount = ?,
          buyPrice = ?,
          btcAmount = ?,
          fee = ?,
          currency = ?,
          note = ?
        WHERE id = ?`,
        input.boughtAt,
        input.amount,
        input.buyPrice,
        input.btcAmount,
        input.fee,
        input.currency,
        input.note ?? null,
        id
      );
    }

    async function deleteAllPurchases() {
      await db.runAsync('DELETE FROM purchases');
    }

    return { listPurchases, addPurchase, updatePurchase, deletePurchase, deleteAllPurchases };
  }, [db]);
}
