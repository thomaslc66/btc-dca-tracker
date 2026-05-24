import { ScrollView, Text, View, Pressable, Alert } from 'react-native';
import { TrendingUp, Wallet, Sigma, RefreshCw, Settings, ArrowDownUp, TrendingDown, Info, Bitcoin, PiggyBank } from 'lucide-react-native';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useState, useMemo } from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { DcaChart } from '@/components/dashboard/DcaChart';
import { BtcGoalCard } from '@/components/dashboard/BtcGoalCard';
import { PurchaseRow } from '@/components/dashboard/PurchaseRow';
import { useDashboard } from '@/hooks/useDashboard';
import { formatCurrency, formatPercent } from '@/utils/format';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useBtcGoal } from '@/contexts/BtcGoalContext';
import { useI18n } from '@/i18n';
import { PurchaseWithMetrics } from '@/types';
import { Trash2, Download } from 'lucide-react-native';
import { exportPurchasesCsv } from '@/utils/exportCsv';

type SortOrder = 'desc' | 'asc';
type PnlFilter = 'all' | 'positive' | 'negative';

type Props = {
  onAddPurchase: () => void;
  onImportCsv: () => void;
  onOpenSettings: () => void;
  onEditPurchase: (purchase: PurchaseWithMetrics) => void;
};

export default function HomeScreen({ onAddPurchase, onImportCsv, onOpenSettings, onEditPurchase }: Props) {
  const { btcPrice, btcPrices, summary, purchases, refreshAll, loading, initialLoading, loadingStep, deletePurchase, deleteAllPurchases } =
    useDashboard();
  const { displayCurrency } = useCurrency();
  const { btcGoal } = useBtcGoal();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [pnlFilter, setPnlFilter] = useState<PnlFilter>('all');

  const filteredPurchases = useMemo(() => {
    let list = [...purchases];
    if (pnlFilter === 'positive') list = list.filter((p) => p.pnl >= 0);
    else if (pnlFilter === 'negative') list = list.filter((p) => p.pnl < 0);
    list.sort((a, b) => {
      const diff = a.boughtAt.localeCompare(b.boughtAt);
      return sortOrder === 'desc' ? -diff : diff;
    });
    return list;
  }, [purchases, sortOrder, pnlFilter]);

  const purchasesLabel = purchases.length === 1
    ? t('home.purchasesTracked_one', { count: purchases.length })
    : t('home.purchasesTracked_other', { count: purchases.length });

  return (
    <View style={{ flex: 1 }}>
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-zinc-900">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
        bounces={false}>
        <View style={{ gap: 16 }}>

        {/* Header */}
        <View renderToHardwareTextureAndroid className="bg-brand-card rounded-3xl border border-white/10 p-5">
          {/* Titre + boutons */}
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-brand-text text-2xl font-bold">DCA BTC Tracker</Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={onOpenSettings}
                className="bg-brand-cardAlt h-11 w-11 items-center justify-center rounded-2xl">
                <Settings size={18} color="#F7931A" />
              </Pressable>
              <Pressable
                onPress={refreshAll}
                className="bg-brand-cardAlt h-11 w-11 items-center justify-center rounded-2xl">
                <RefreshCw size={18} color="#F7931A" />
              </Pressable>
            </View>
          </View>

          {/* P&L en vedette */}
          <View className="flex-row items-center gap-2">
            <Text className="text-brand-muted text-sm">{t('home.totalPnl')}</Text>
            <Pressable
              onPress={() => Alert.alert(t('home.pnlInfoTitle'), t('home.pnlInfoDesc'))}
              hitSlop={8}>
              <Info size={14} color="#6B7280" />
            </Pressable>
          </View>
          <Text className={`mt-1 text-4xl font-extrabold ${summary.totalPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {summary.totalPnL >= 0 ? '+' : ''}{formatCurrency(summary.totalPnL, displayCurrency)}
          </Text>
          <Text className={`mt-1 text-lg font-bold ${summary.totalPnL >= 0 ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
            {formatPercent(summary.totalRoiPercent)}
          </Text>

          {/* Prix BTC actuel */}
          <View className="mt-3 flex-row items-center gap-2">
            <Bitcoin size={14} color="#F7931A" />
            <Text className="text-white text-sm font-semibold">
              {formatCurrency(btcPrice, displayCurrency)}
            </Text>
          </View>

          <Text className="text-brand-muted mt-3 text-xs">
            {loading ? t('home.syncing') : purchasesLabel}
          </Text>

          <View className="mt-4 flex-row gap-3">
            <Pressable
              onPress={onAddPurchase}
              className="bg-brand-orange flex-1 items-center rounded-2xl px-4 py-3">
              <Text className="font-bold text-black">{t('home.addPurchase')}</Text>
            </Pressable>
            <Pressable
              onPress={onImportCsv}
              className="bg-brand-cardAlt items-center justify-center rounded-2xl border border-white/10 px-4 py-3">
              <Text className="text-brand-text font-semibold">{t('home.importCsv')}</Text>
            </Pressable>
          </View>
        </View>


        {/* Stats */}
        <View className="flex-row gap-3">
          <StatCard
            title={t('home.investedCard', { currency: displayCurrency })}
            value={formatCurrency(summary.totalInvested, displayCurrency)}
            icon={<PiggyBank size={18} color="#F7931A" />}
          />
          <StatCard
            title={t('home.totalBtc')}
            value={summary.totalBtc.toFixed(8)}
            icon={<Wallet size={18} color="#F7931A" />}
          />
        </View>

        <View className="flex-row gap-3">
          <StatCard
            title={t('home.roi')}
            value={formatPercent(summary.totalRoiPercent)}
            icon={<Sigma size={18} color={summary.totalPnL >= 0 ? '#22C55E' : '#EF4444'} />}
          />
          <StatCard
            title={t('home.avgBuyPrice', { currency: displayCurrency })}
            value={summary.totalBtc > 0 ? formatCurrency(summary.totalInvested / summary.totalBtc, displayCurrency) : '—'}
            icon={<TrendingUp size={18} color="#F7931A" />}
          />
        </View>

        {/* Répartition par devise */}
        {summary.byCurrency.length > 1 && (
          <View className="bg-brand-card rounded-3xl border border-white/10 p-5">
            <Text className="text-brand-text mb-3 text-base font-bold">{t('home.byCurrency')}</Text>
            <View className="gap-2">
              {summary.byCurrency.map(({ currency, totalInvested }) => (
                <View key={currency} className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <View className="rounded bg-white/10 px-2 py-0.5">
                      <Text className="font-mono text-xs font-semibold text-white">{currency}</Text>
                    </View>
                    <Text className="text-brand-muted text-sm">{t('home.investedLabel')}</Text>
                  </View>
                  <Text className="text-sm font-semibold text-white">
                    {formatCurrency(totalInvested, currency)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Graphique DCA */}
        {purchases.length >= 2 && (
          <DcaChart
            purchases={filteredPurchases}
            currentPrice={btcPrice}
            displayCurrency={displayCurrency}
          />
        )}

        {/* Objectif BTC */}
        {btcGoal !== null && (
          <BtcGoalCard totalBtc={summary.totalBtc} goal={btcGoal} />
        )}

        {/* Liste des achats */}
        <View className="bg-brand-card rounded-3xl border border-white/10 p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-brand-text text-lg font-bold">{t('home.dcaPurchases')}</Text>
            {purchases.length > 0 && (
              <View className="flex-row items-center gap-1">
                <Pressable
                  onPress={() => exportPurchasesCsv(purchases)}
                  android_ripple={{ color: '#F7931A30', radius: 20 }}
                  className="rounded-xl p-2">
                  <Download size={18} color="#F7931A" />
                </Pressable>
                <Pressable
                  onPress={() => {
                    Alert.alert(
                      t('home.deleteAllTitle'),
                      t('home.deleteAllMessage'),
                      [
                        { text: t('common.cancel'), style: 'cancel' },
                        { text: t('home.deleteAllConfirm'), style: 'destructive', onPress: deleteAllPurchases },
                      ]
                    );
                  }}
                  android_ripple={{ color: '#F7931A30', radius: 20 }}
                  className="rounded-xl p-2">
                  <Trash2 size={18} color="#F7931A" />
                </Pressable>
              </View>
            )}
          </View>

          {/* Barre de tri / filtre */}
          {purchases.length > 0 && (
            <View className="mb-4 flex-row items-center gap-2">
              <Pressable
                onPress={() => setSortOrder((o) => (o === 'desc' ? 'asc' : 'desc'))}
                className={`flex-row items-center gap-1.5 rounded-xl border px-3 py-2 ${
                  sortOrder !== 'desc'
                    ? 'bg-brand-orange/15 border-brand-orange'
                    : 'bg-brand-cardAlt border-white/10'
                }`}>
                <ArrowDownUp size={13} color={sortOrder !== 'desc' ? '#F7931A' : '#9CA3AF'} />
                <Text className={`text-xs font-semibold ${sortOrder !== 'desc' ? 'text-brand-orange' : 'text-white/50'}`}>
                  {sortOrder === 'desc' ? t('home.sortNewest') : t('home.sortOldest')}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setPnlFilter((f) => (f === 'positive' ? 'all' : 'positive'))}
                className={`flex-row items-center gap-1.5 rounded-xl border px-3 py-2 ${
                  pnlFilter === 'positive'
                    ? 'bg-emerald-500/10 border-emerald-500/40'
                    : 'bg-brand-cardAlt border-white/10'
                }`}>
                <TrendingUp size={13} color={pnlFilter === 'positive' ? '#22C55E' : '#9CA3AF'} />
                <Text className={`text-xs font-semibold ${pnlFilter === 'positive' ? 'text-emerald-400' : 'text-white/50'}`}>
                  {t('home.filterPositive')}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setPnlFilter((f) => (f === 'negative' ? 'all' : 'negative'))}
                className={`flex-row items-center gap-1.5 rounded-xl border px-3 py-2 ${
                  pnlFilter === 'negative'
                    ? 'bg-red-500/10 border-red-500/40'
                    : 'bg-brand-cardAlt border-white/10'
                }`}>
                <TrendingDown size={13} color={pnlFilter === 'negative' ? '#EF4444' : '#9CA3AF'} />
                <Text className={`text-xs font-semibold ${pnlFilter === 'negative' ? 'text-red-400' : 'text-white/50'}`}>
                  {t('home.filterNegative')}
                </Text>
              </Pressable>
            </View>
          )}

          <View className="gap-3">
            {purchases.length === 0 ? (
              <Text className="text-brand-muted">{t('home.emptyState')}</Text>
            ) : filteredPurchases.length === 0 ? (
              <Text className="text-brand-muted text-center py-4">{t('home.noResults')}</Text>
            ) : (
              filteredPurchases.map((purchase) => (
                <PurchaseRow
                  key={purchase.id}
                  purchase={purchase}
                  currentPrice={btcPrice}
                  displayCurrency={displayCurrency}
                  btcPrices={btcPrices}
                  onDelete={deletePurchase}
                  onEdit={onEditPurchase}
                />
              ))
            )}
          </View>
        </View>
        </View>
      </ScrollView>
    </View>
    {initialLoading && (
      <LoadingScreen
        overlay
        message={loadingStep === 'purchases' ? t('loading.stepPurchases') : loadingStep === 'btcPrice' ? t('loading.stepBtcPrice') : undefined}
      />
    )}
    </View>
  );
}
