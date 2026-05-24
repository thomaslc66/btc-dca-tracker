import { writeAsStringAsync, documentDirectory } from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { PurchaseWithMetrics } from '@/types';

export async function exportPurchasesCsv(purchases: PurchaseWithMetrics[]): Promise<void> {
  const header = 'boughtAt,amount,buyPrice,fee,currency,btcAmount,note';
  const rows = purchases
    .slice()
    .sort((a, b) => a.boughtAt.localeCompare(b.boughtAt))
    .map((p) => {
      const note = p.note ? `"${p.note.replace(/"/g, '""')}"` : '';
      return `${p.boughtAt},${p.amount},${p.buyPrice},${p.fee},${p.currency},${p.btcAmount},${note}`;
    });

  const csv = [header, ...rows].join('\n');
  const uri = `${documentDirectory}dca-btc-export.csv`;
  await writeAsStringAsync(uri, csv);
  await Sharing.shareAsync(uri, { mimeType: 'text/csv', dialogTitle: 'Export DCA BTC' });
}
