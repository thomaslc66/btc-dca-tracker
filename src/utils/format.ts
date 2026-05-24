export const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

export const formatPercent = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('fr-CH', { year: 'numeric', month: '2-digit', day: '2-digit' });
