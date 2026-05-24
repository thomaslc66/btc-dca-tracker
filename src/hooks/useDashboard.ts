import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchBtcPrices, SUPPORTED_CURRENCIES } from '@/services/exchangeRate';
import { buildSummary, enrichPurchase } from '@/utils/calculations';
import { BtcPrices, Purchase } from '@/types';
import { usePurchasesRepository } from '@/db/purchases';
import { useCurrency } from '@/contexts/CurrencyContext';

export type LoadingStep = 'purchases' | 'btcPrice' | null;

export function useDashboard() {
  const repo = usePurchasesRepository();
  const { displayCurrency } = useCurrency();
  const [btcPrices, setBtcPrices] = useState<BtcPrices>({ CHF: 85000 });
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState<LoadingStep>('purchases');
  const isFirstLoad = useRef(true);

  const btcPrice = btcPrices[displayCurrency] ?? 85000;

  const summary = useMemo(
    () => buildSummary(purchases, btcPrices, displayCurrency),
    [purchases, btcPrices, displayCurrency]
  );

  const enriched = useMemo(
    () => purchases.map((item) => enrichPurchase(item, btcPrices, displayCurrency)),
    [purchases, btcPrices, displayCurrency]
  );

  const loadPurchases = useCallback(async () => {
    const rows = await repo.listPurchases();
    setPurchases(rows);
  }, [repo]);

  const loadBtcPrices = useCallback(async () => {
    const prices = await fetchBtcPrices(SUPPORTED_CURRENCIES);
    setBtcPrices(prices);
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    try {
      if (isFirstLoad.current) {
        setLoadingStep('purchases');
        await loadPurchases();
        setLoadingStep('btcPrice');
        await loadBtcPrices();
        isFirstLoad.current = false;
        setInitialLoading(false);
      } else {
        await Promise.all([loadPurchases(), loadBtcPrices()]);
      }
    } finally {
      setLoading(false);
      setLoadingStep(null);
    }
  }, [loadPurchases, loadBtcPrices]);

  const deletePurchase = useCallback(
    async (id: number) => {
      await repo.deletePurchase(id);
      await loadPurchases();
    },
    [repo, loadPurchases]
  );

  const deleteAllPurchases = useCallback(async () => {
    await repo.deleteAllPurchases();
    await loadPurchases();
  }, [repo, loadPurchases]);

  useEffect(() => {
    refreshAll();
  }, []);

  // Re-calculer quand la devise de référence change (sans re-fetch)
  useEffect(() => {}, [displayCurrency]);

  return {
    btcPrice,
    btcPrices,
    purchases: enriched,
    summary,
    loading,
    initialLoading,
    loadingStep,
    refreshAll,
    deletePurchase,
    deleteAllPurchases,
  };
}
