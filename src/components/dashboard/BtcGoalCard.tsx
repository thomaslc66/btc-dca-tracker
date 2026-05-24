import { View, Text } from 'react-native';
import { useI18n } from '@/i18n';

type Props = {
  totalBtc: number;
  goal: number;
};

export function BtcGoalCard({ totalBtc, goal }: Props) {
  const { t } = useI18n();
  const progress = Math.min(totalBtc / goal, 1);
  const percent = (progress * 100).toFixed(1);
  const remaining = Math.max(goal - totalBtc, 0);
  const reached = totalBtc >= goal;

  return (
    <View className="bg-brand-card rounded-3xl border border-white/10 p-5">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-bold text-white">{t('goal.title')}</Text>
        <Text className={`text-sm font-bold ${reached ? 'text-emerald-400' : 'text-brand-orange'}`}>
          {reached ? t('goal.reached') : `${percent}%`}
        </Text>
      </View>

      {/* Barre de progression */}
      <View className="h-3 w-full overflow-hidden rounded-full bg-white/10">
        <View
          className={`h-3 rounded-full ${reached ? 'bg-emerald-400' : 'bg-brand-orange'}`}
          style={{ width: `${progress * 100}%` }}
        />
      </View>

      {/* Chiffres */}
      <View className="mt-3 flex-row items-end justify-between">
        <View>
          <Text className="text-brand-muted text-xs">{t('goal.accumulated')}</Text>
          <Text className="text-white font-semibold text-sm">{totalBtc.toFixed(8)} BTC</Text>
        </View>
        <View className="items-end">
          <Text className="text-brand-muted text-xs">{t('goal.target')}</Text>
          <Text className="text-white font-semibold text-sm">{goal.toFixed(8)} BTC</Text>
        </View>
      </View>

      {!reached && (
        <Text className="text-brand-muted text-xs mt-2">
          {t('goal.remaining', { btc: remaining.toFixed(8) })}
        </Text>
      )}
    </View>
  );
}
