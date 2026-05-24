import axios from 'axios';

export const SUPPORTED_CURRENCIES = ['CHF', 'USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SEK', 'NOK', 'DKK', 'RUB'] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

const FALLBACK_PRICES: Record<string, number> = {
  CHF: 85000,
  USD: 95000,
  EUR: 88000,
  GBP: 75000,
  CAD: 130000,
  AUD: 145000,
  JPY: 14000000,
  SEK: 1000000,
  NOK: 1000000,
  DKK: 660000,
  RUB: 9000000,
};

export async function fetchBtcPrices(currencies: readonly string[]): Promise<Record<string, number>> {
  try {
    const vs = currencies.map((c) => c.toLowerCase()).join(',');
    const response = await axios.get<{ bitcoin?: Record<string, number> }>(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${vs}`,
      { timeout: 8000 }
    );

    const data = response.data.bitcoin ?? {};
    const result: Record<string, number> = {};
    for (const currency of currencies) {
      const price = data[currency.toLowerCase()];
      result[currency] = price ?? FALLBACK_PRICES[currency] ?? 85000;
    }
    return result;
  } catch {
    return Object.fromEntries(currencies.map((c) => [c, FALLBACK_PRICES[c] ?? 85000]));
  }
}

/** Convertit un montant d'une devise vers une autre via les prix BTC live. */
export function convertAmount(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  btcPrices: Record<string, number>
): number {
  if (fromCurrency === toCurrency) return amount;
  const from = btcPrices[fromCurrency];
  const to = btcPrices[toCurrency];
  if (!from || !to) return amount;
  return amount * (to / from);
}
