import { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { PurchaseWithMetrics } from '@/types';
import { formatCurrency } from '@/utils/format';
import { useI18n } from '@/i18n';

type Props = {
  purchases: PurchaseWithMetrics[];
  currentPrice: number;
  displayCurrency: string;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - 80;
const CHART_HEIGHT = 180;

export function DcaChart({ purchases, currentPrice, displayCurrency }: Props) {
  const { t } = useI18n();

  const sorted = useMemo(
    () => [...purchases].sort((a, b) => a.boughtAt.localeCompare(b.boughtAt)),
    [purchases]
  );

  const data = useMemo(
    () =>
      sorted.map((p) => ({
        value: p.buyPrice,
        date: p.boughtAt.slice(0, 10),
        label: p.boughtAt.slice(2, 7), // "YY-MM"
        labelTextStyle: { color: '#6B7280', fontSize: 9 },
        dataPointColor: '#F7931A',
        dataPointRadius: 4,
      })),
    [sorted]
  );

  const allPrices = [...data.map((d) => d.value), currentPrice];
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const range = maxPrice - minPrice || maxPrice * 0.2;
  const yMin = Math.max(0, minPrice - range * 0.15);
  const yMax = maxPrice + range * 0.25;

  // Position Y en pixels du label du prix actuel (juste sous la ligne)
  const refLineScreenY = CHART_HEIGHT * (1 - (currentPrice - yMin) / (yMax - yMin));
  const labelTop = Math.max(4, Math.min(refLineScreenY + 3, CHART_HEIGHT - 16));

  if (sorted.length === 0) return null;

  return (
    <View className="bg-brand-card rounded-3xl border border-white/10 p-5">
      <Text className="text-brand-text mb-1 text-base font-bold">{t('chart.title')}</Text>
      <Text className="text-brand-muted mb-4 text-xs">{t('chart.subtitle')}</Text>

      <View>
        <LineChart
          data={data}
          width={CHART_WIDTH}
          height={CHART_HEIGHT}
          spacing={50}
          color="#F7931A"
          thickness={2}
          curved
          areaChart
          startFillColor="#F7931A"
          endFillColor="transparent"
          startOpacity={0.18}
          endOpacity={0}
          backgroundColor="transparent"
          yAxisColor="transparent"
          xAxisColor="#ffffff15"
          hideYAxisText
          yAxisOffset={yMin}
          maxValue={yMax - yMin}
          noOfSections={4}
          hideRules
          disableScroll={true}
          isAnimated={false}
          initialSpacing={16}
          endSpacing={16}
          showReferenceLine1
          referenceLine1Position={currentPrice}
          referenceLine1Config={{
            color: '#22C55E',
            thickness: 1.5,
            type: 'dashed',
            dashWidth: 5,
            dashGap: 4,
          }}
          pointerConfig={{
            pointerStripHeight: CHART_HEIGHT,
            pointerStripColor: '#ffffff25',
            pointerStripWidth: 1,
            pointerColor: '#F7931A',
            radius: 5,
            pointerLabelWidth: 145,
            pointerLabelHeight: 48,
            activatePointersOnLongPress: false,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: { value: number; date?: string }[]) => {
              const item = items[0];
              return (
                <View className="rounded-xl border border-white/10 bg-zinc-800 px-3 py-2">
                  <Text className="text-brand-orange text-xs font-bold">
                    {formatCurrency(item.value, displayCurrency)}
                  </Text>
                  {item.date ? (
                    <Text className="text-brand-muted text-xs mt-0.5">{item.date}</Text>
                  ) : null}
                </View>
              );
            },
          }}
        />

        {/* Label prix actuel BTC au-dessus de la ligne verte, à gauche */}
        <View
          style={{ position: 'absolute', top: Math.max(2, labelTop - 14), left: 2 }}
          pointerEvents="none">
          <Text style={{ color: '#22C55E', fontSize: 9, fontWeight: '600' }}>
            {formatCurrency(currentPrice, displayCurrency)}
          </Text>
        </View>
      </View>

      {/* Légende */}
      <View className="mt-3 flex-row items-center gap-4">
        <View className="flex-row items-center gap-1.5">
          <View className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <Text className="text-brand-muted text-xs">{t('chart.legendEntry')}</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View style={{ width: 20, height: 10, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={{ width: 4, height: 1.5, backgroundColor: '#22C55E' }} />
              ))}
            </View>
          </View>
          <Text className="text-brand-muted text-xs">{t('chart.legendCurrent')}</Text>
        </View>
      </View>
    </View>
  );
}
