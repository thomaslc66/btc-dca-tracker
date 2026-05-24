export type BtcPrices = Record<string, number>;

export type Purchase = {
  id: string | number;
  boughtAt: string;
  amount: number;
  currency: string;
  btcAmount: number;
  fee: number;
  buyPrice: number;
  note?: string | null;
};

export type PurchaseWithMetrics = Purchase & {
  entryPrice: number;
  currentValue: number;
  pnl: number;
  roiPercent: number;
};

export type CurrencyBreakdown = {
  currency: string;
  totalInvested: number;
};

export type DashboardSummary = {
  totalInvested: number;
  totalBtc: number;
  totalCurrentValue: number;
  totalPnL: number;
  totalRoiPercent: number;
  byCurrency: CurrencyBreakdown[];
};
