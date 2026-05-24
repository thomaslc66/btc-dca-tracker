import Papa from 'papaparse';
import { Purchase } from '@/types';
import { CsvParseResult, normalizeBoughtAt } from '@/utils/parseCsv';

// Colonnes utilisées : pair, time, price, cost, fee, vol
// Colonnes ignorées  : txid, ordertxid, aclass, subclass, ordertype, margin,
//                      misc, ledgers, posttxid, posstatuscode, cprice, ccost,
//                      cfee, cvol, cmargin, net, trades

type KrakenTradeRow = {
  pair: string;
  type: string;
  time: string;
  price: string;
  cost: string;
  fee: string;
  vol: string;
  [key: string]: string;
};

/** Extrait la devise de cotation depuis une paire Kraken (ex: "BTC/CHF" → "CHF"). */
function extractCurrencyFromPair(pair: string): string | null {
  const match = pair.toUpperCase().match(/^(?:BTC|XBT)\/([A-Z]+)$/);
  return match?.[1] ?? null;
}

export function parseKrakenTradesCsv(csvText: string): CsvParseResult {
  const parsed = Papa.parse<KrakenTradeRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0 && parsed.data.length === 0) {
    return { success: false, error: 'Impossible de lire le fichier CSV Kraken.' };
  }

  const purchases: Omit<Purchase, 'id'>[] = [];
  const errors: string[] = [];

  parsed.data.forEach((row, i) => {
    const lineNum = i + 2; // +2 car ligne 1 = header

    const pair = (row.pair ?? '').trim();
    const type = (row.type ?? '').toLowerCase();

    // On garde uniquement les achats BTC/XXX
    const currency = extractCurrencyFromPair(pair);
    if (!currency || type !== 'buy') return;

    const boughtAt = normalizeBoughtAt(row.time ?? '');
    if (!boughtAt) {
      errors.push(`Ligne ${lineNum} : date invalide "${row.time}"`);
      return;
    }

    const amount = parseFloat(row.cost ?? '');
    const buyPrice = parseFloat(row.price ?? '');
    const fee = parseFloat(row.fee ?? '0') || 0;
    const btcAmount = Math.abs(parseFloat(row.vol ?? ''));

    if (isNaN(amount) || amount <= 0) {
      errors.push(`Ligne ${lineNum} : montant (cost) invalide "${row.cost}"`);
      return;
    }
    if (isNaN(buyPrice) || buyPrice <= 0) {
      errors.push(`Ligne ${lineNum} : prix (price) invalide "${row.price}"`);
      return;
    }
    if (isNaN(btcAmount) || btcAmount <= 0) {
      errors.push(`Ligne ${lineNum} : volume BTC (vol) invalide "${row.vol}"`);
      return;
    }

    purchases.push({
      boughtAt,
      amount,
      buyPrice,
      fee,
      currency,
      btcAmount,
      note: 'Import Kraken',
    });
  });

  if (errors.length > 0 && purchases.length === 0) {
    return { success: false, error: errors.join('\n') };
  }

  if (purchases.length === 0) {
    return {
      success: false,
      error: "Aucun achat BTC/* trouvé dans ce fichier. Vérifiez qu'il s'agit bien d'un export Kraken Trades.",
    };
  }

  return { success: true, purchases };
}
