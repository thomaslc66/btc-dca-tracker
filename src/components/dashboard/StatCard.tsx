import { ReactNode } from 'react';
import { Text, View } from 'react-native';

type Props = {
  title: string;
  value: string;
  icon?: ReactNode;
  accent?: 'success' | 'danger' | 'default';
};

export function StatCard({ title, value, icon, accent = 'default' }: Props) {
  const valueColor = accent === 'success' ? 'text-brand-success' : accent === 'danger' ? 'text-brand-danger' : 'text-brand-text';

  return (
    <View className="flex-1 rounded-3xl bg-brand-card p-4 border border-white/10">
      <View className="flex-row items-center gap-2 mb-2">
        {icon}
        <Text className="text-brand-muted text-sm">{title}</Text>
      </View>
      <Text className={`text-lg font-bold ${valueColor}`}>{value}</Text>
    </View>
  );
}
