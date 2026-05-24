import { ActivityIndicator, Text, View } from 'react-native';
import { Bitcoin } from 'lucide-react-native';

export function LoadingScreen({ overlay = false, message }: { overlay?: boolean; message?: string }) {
  const inner = (
    <View className="items-center gap-5">
      <View className="items-center gap-3">
        <View className="rounded-3xl bg-brand-card border border-white/10 p-5">
          <Bitcoin size={48} color="#F7931A" />
        </View>
        <Text className="text-2xl font-extrabold text-white tracking-tight">DCA BTC Tracker</Text>
      </View>
      <ActivityIndicator size="large" color="#F7931A" />
      {message ? (
        <Text className="text-brand-muted text-sm text-center">{message}</Text>
      ) : null}
    </View>
  );

  if (overlay) {
    return (
      <View
        className="items-center justify-center"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(24,24,27,0.88)' }}>
        {inner}
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-zinc-900">
      {inner}
    </View>
  );
}
