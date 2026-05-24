import { Purchase } from '@/types';

export type CsvParseResult =
  | { success: true; purchases: Omit<Purchase, 'id'>[] }
  | { success: false; error: string };

/**
 * Normalise une valeur boughtAt en "YYYY-MM-DD" ou "YYYY-MM-DD HH:MM".
 * Formats acceptés :
 *   - "2026-05-04"
 *   - "2024-03-15 03:23"
 *   - "2024-03-15 03:23:57"
 *   - "2024-03-15 03:23:57.859"
 * Retourne null si aucun format ne correspond.
 */
export function normalizeBoughtAt(raw: string): string | null {
  // Date seule : YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;

  // Date + heure (secondes et fractions optionnelles) : YYYY-MM-DD HH:MM[:SS[.fff]]
  const withTime = raw.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2})(?::\d{2}(?:\.\d+)?)?$/);
  if (withTime) return `${withTime[1]} ${withTime[2]}`;

  // Fallback : tenter d'extraire juste la date
  const dateOnly = raw.match(/^(\d{4}-\d{2}-\d{2})/);
  if (dateOnly) return dateOnly[1];

  return null;
}

/**
 * Parse un CSV standard.
 * Colonnes requises : boughtAt, amount (ou amountChf), buyPrice (ou buyPriceChf), fee (ou feeChf)
 * Colonnes optionnelles : currency (défaut = defaultCurrency), note
 */
export function parseCsv(content: string, defaultCurrency = 'CHF'): CsvParseResult {
  const lines = content
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return { success: false, error: 'Le fichier CSV est vide ou ne contient pas de données.' };
  }

  const header = lines[0]
    .toLowerCase()
    .split(',')
    .map((h) => h.trim());

  // Résolution des colonnes avec backward-compat (amountChf → amount, etc.)
  function findCol(...candidates: string[]): number {
    for (const name of candidates) {
      const idx = header.indexOf(name);
      if (idx >= 0) return idx;
    }
    return -1;
  }

  const idx = {
    boughtAt: findCol('boughtat'),
    amount: findCol('amount', 'amountchf'),
    buyPrice: findCol('buyprice', 'buypricechf'),
    fee: findCol('fee', 'feechf'),
    currency: findCol('currency'),
    note: findCol('note'),
  };

  const missing = (['boughtAt', 'amount', 'buyPrice', 'fee'] as const).filter(
    (k) => idx[k] < 0
  );
  if (missing.length > 0) {
    return {
      success: false,
      error: `Colonnes manquantes : ${missing.join(', ')}.\n\nColonnes attendues : boughtAt, amount, buyPrice, fee, currency (optionnel), note (optionnel)`,
    };
  }

  const purchases: Omit<Purchase, 'id'>[] = [];
  const errors: string[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim());
    const lineNum = i + 1;

    const rawBoughtAt = cols[idx.boughtAt] ?? '';
    const amount = parseFloat(cols[idx.amount] ?? '');
    const buyPrice = parseFloat(cols[idx.buyPrice] ?? '');
    const fee = parseFloat(cols[idx.fee] ?? '0') || 0;
    const currency = (idx.currency >= 0 ? cols[idx.currency] : '')?.trim().toUpperCase() || defaultCurrency;
    const note = idx.note >= 0 ? (cols[idx.note] ?? '').trim() || null : null;

    const boughtAt = normalizeBoughtAt(rawBoughtAt);
    if (!boughtAt) {
      errors.push(`Ligne ${lineNum} : date invalide "${rawBoughtAt}" (formats acceptés : YYYY-MM-DD ou YYYY-MM-DD HH:MM)`);
      continue;
    }
    if (isNaN(amount) || amount <= 0) {
      errors.push(`Ligne ${lineNum} : montant invalide "${cols[idx.amount]}"`);
      continue;
    }
    if (isNaN(buyPrice) || buyPrice <= 0) {
      errors.push(`Ligne ${lineNum} : prix d'achat invalide "${cols[idx.buyPrice]}"`);
      continue;
    }

    purchases.push({
      boughtAt,
      amount,
      buyPrice,
      fee,
      currency,
      btcAmount: amount / buyPrice,
      note,
    });
  }

  if (errors.length > 0 && purchases.length === 0) {
    return { success: false, error: errors.join('\n') };
  }

  return { success: true, purchases };
}
