import { Alert, Pressable, Text, View } from 'react-native';
import { Pencil, StickyNote, Trash2 } from 'lucide-react-native';
import { BtcPrices, PurchaseWithMetrics } from '@/types';
import { formatCurrency, formatDate, formatPercent } from '@/utils/format';
import { useI18n } from '@/i18n';

type Props = {
  purchase: PurchaseWithMetrics;
  currentPrice: number;
  displayCurrency: string;
  btcPrices: BtcPrices;
  onDelete?: (id: number) => void;
  onEdit?: (purchase: PurchaseWithMetrics) => void;
};

export function PurchaseRow({ purchase, currentPrice, displayCurrency, onDelete, onEdit }: Props) {
  const { t } = useI18n();
  const positive = purchase.pnl >= 0;
  const pnlColor = positive ? 'text-emerald-400' : 'text-red-400';
  const pnlBg = positive ? 'bg-emerald-500/10' : 'bg-red-500/10';
  const sameAsCurrency = purchase.currency === displayCurrency;

  return (
    <Pressable
      onPress={() => onEdit?.(purchase)}
      android_ripple={{ color: '#ffffff10' }}
      renderToHardwareTextureAndroid
      className="bg-brand-cardAlt overflow-hidden rounded-2xl border border-white/10">

      {/* Header : date + P&L */}
      <View className="flex-row items-center justify-between px-4 pb-3 pt-4">
        <View className="flex-row items-center gap-2">
          <Text className="text-lg font-bold text-white">{formatDate(purchase.boughtAt)}</Text>
          {!sameAsCurrency && (
            <View className="rounded-md bg-white/10 px-2 py-0.5">
              <Text className="font-mono text-xs font-semibold text-white/60">
                {purchase.currency}
              </Text>
            </View>
          )}
        </View>
        <View className={`rounded-xl px-3 py-1 ${pnlBg}`}>
          <Text className={`text-base font-bold ${pnlColor}`}>
            {positive ? '+' : ''}
            {formatCurrency(purchase.pnl, displayCurrency)}
          </Text>
        </View>
      </View>

      {/* Séparateur après le header */}
      <View className="mx-4 h-px bg-white/10" />

      {/* Données */}
      <View className="px-4 py-3 gap-2.5">
        {/* Ligne 1 : Investi | Valeur actuelle */}
        <View className="flex-row justify-between">
          <MetricCol
            label={t('row.invested')}
            value={formatCurrency(purchase.amount + purchase.fee, purchase.currency)}
            subValue={!sameAsCurrency ? `≈ ${formatCurrency(purchase.entryPrice * purchase.btcAmount, displayCurrency)}` : undefined}
          />
          <MetricCol
            label={t('row.currentValue')}
            value={formatCurrency(purchase.currentValue, displayCurrency)}
            align="right"
          />
        </View>

        {/* Ligne 2 : BTC | ROI */}
        <View className="flex-row justify-between">
          <MetricCol label={t('row.btc')} value={purchase.btcAmount.toFixed(8)} mono />
          <MetricCol
            label={t('row.roi')}
            value={formatPercent(purchase.roiPercent)}
            colored={positive ? 'positive' : 'negative'}
            align="right"
          />
        </View>

        {/* Ligne 3 : Prix d'entrée */}
        <View className="items-end">
          <MetricCol
            label={t('row.entryPrice')}
            value={formatCurrency(purchase.entryPrice, displayCurrency)}
            align="right"
          />
        </View>
      </View>

      {/* Note */}
      {purchase.note ? (
        <View className="flex-row items-start gap-2 px-4 pb-2">
          <StickyNote size={13} color="#9CA3AF" style={{ marginTop: 1 }} />
          <Text className="text-brand-muted flex-1 text-xs italic">{purchase.note}</Text>
        </View>
      ) : null}

      {/* Séparateur avant actions */}
      <View className="mx-4 h-px bg-white/10" />

      {/* Footer : actions */}
      <View className="flex-row items-center justify-end gap-1 px-3 py-2">
        <Pressable
          onPress={() => onEdit?.(purchase)}
          android_ripple={{ color: '#F7931A30', radius: 20 }}
          className="flex-row items-center gap-1.5 rounded-xl px-3 py-2">
          <Pencil size={14} color="#F7931A" />
          <Text className="text-brand-orange text-xs font-semibold">{t('row.edit')}</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            Alert.alert(
              t('row.deleteTitle'),
              t('row.deleteMessage', {
                date: formatDate(purchase.boughtAt),
                amount: formatCurrency(purchase.amount, purchase.currency),
              }),
              [
                { text: t('common.cancel'), style: 'cancel' },
                {
                  text: t('row.delete'),
                  style: 'destructive',
                  onPress: () => onDelete?.(purchase.id as number),
                },
              ]
            );
          }}
          android_ripple={{ color: '#EF444430', radius: 20 }}
          className="flex-row items-center gap-1.5 rounded-xl px-3 py-2">
          <Trash2 size={14} color="#EF4444" />
          <Text className="text-xs font-semibold text-red-400">{t('row.delete')}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

function MetricCol({
  label,
  value,
  subValue,
  mono,
  colored,
  align = 'left',
}: {
  label: string;
  value: string;
  subValue?: string;
  mono?: boolean;
  colored?: 'positive' | 'negative';
  align?: 'left' | 'right';
}) {
  const valueColor =
    colored === 'positive'
      ? 'text-emerald-400'
      : colored === 'negative'
        ? 'text-red-400'
        : 'text-white';

  return (
    <View className={`gap-0.5 ${align === 'right' ? 'items-end' : ''}`}>
      <Text className={`text-brand-muted text-xs ${align === 'right' ? 'text-right' : ''}`}>
        {label}
      </Text>
      <Text
        className={`text-sm font-semibold ${valueColor} ${mono ? 'font-mono' : ''} ${align === 'right' ? 'text-right' : ''}`}>
        {value}
      </Text>
      {subValue && (
        <Text className={`text-brand-muted text-xs ${align === 'right' ? 'text-right' : ''}`}>
          {subValue}
        </Text>
      )}
    </View>
  );
}
