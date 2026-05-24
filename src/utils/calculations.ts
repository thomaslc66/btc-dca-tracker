import { BtcPrices, CurrencyBreakdown, DashboardSummary, Purchase, PurchaseWithMetrics } from '@/types';
import { convertAmount } from '@/services/exchangeRate';

export function enrichPurchase(
  purchase: Purchase,
  btcPrices: BtcPrices,
  displayCurrency: string
): PurchaseWithMetrics {
  const currentValue = purchase.btcAmount * (btcPrices[displayCurrency] ?? 0);
  const totalCostDisplay = convertAmount(
    purchase.amount + purchase.fee,
    purchase.currency,
    displayCurrency,
    btcPrices
  );
  const entryPrice = purchase.btcAmount > 0 ? totalCostDisplay / purchase.btcAmount : 0;
  const pnl = currentValue - totalCostDisplay;
  const roiPercent = totalCostDisplay > 0 ? (pnl / totalCostDisplay) * 100 : 0;

  return { ...purchase, entryPrice, currentValue, pnl, roiPercent };
}

export function buildSummary(
  purchases: Purchase[],
  btcPrices: BtcPrices,
  displayCurrency: string
): DashboardSummary {
  let totalInvested = 0;
  const currencyMap: Record<string, number> = {};

  for (const p of purchases) {
    const costDisplay = convertAmount(p.amount + p.fee, p.currency, displayCurrency, btcPrices);
    totalInvested += costDisplay;
    currencyMap[p.currency] = (currencyMap[p.currency] ?? 0) + p.amount + p.fee;
  }

  const totalBtc = purchases.reduce((sum, p) => sum + p.btcAmount, 0);
  const totalCurrentValue = totalBtc * (btcPrices[displayCurrency] ?? 0);
  const totalPnL = totalCurrentValue - totalInvested;
  const totalRoiPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  const byCurrency: CurrencyBreakdown[] = Object.entries(currencyMap).map(
    ([currency, totalInvested]) => ({ currency, totalInvested })
  );

  return { totalInvested, totalBtc, totalCurrentValue, totalPnL, totalRoiPercent, byCurrency };
}
