import { useState } from 'react';
import { Pressable, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, FileText, Upload, CheckCircle, AlertCircle, Download } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import { readAsStringAsync } from 'expo-file-system/legacy';
import { usePurchasesRepository } from '@/db/purchases';
import { parseCsv } from '@/utils/parseCsv';
import { parseKrakenTradesCsv } from '@/utils/krakenCsv';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useI18n } from '@/i18n';
import * as Sharing from 'expo-sharing';
import { writeAsStringAsync, documentDirectory } from 'expo-file-system/legacy';

type Props = { onBack: () => void; onImported: () => void };
type Status = 'idle' | 'loading' | 'success' | 'error';
type CsvFormat = 'standard' | 'kraken';

async function handleDownloadExample(currency: string) {
  const csv = `boughtAt,amount,buyPrice,fee,currency,note\n2026-01-15,500,95000,2.5,${currency},Replace this line`;
  const uri = `${documentDirectory}exemple-dca-btc.csv`;
  await writeAsStringAsync(uri, csv);
  await Sharing.shareAsync(uri, { mimeType: 'text/csv', dialogTitle: 'Download example CSV' });
}

export default function ImportCsvScreen({ onBack, onImported }: Props) {
  const insets = useSafeAreaInsets();
  const { addPurchase } = usePurchasesRepository();
  const { displayCurrency } = useCurrency();
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [importedCount, setImportedCount] = useState(0);
  const [csvFormat, setCsvFormat] = useState<CsvFormat>('standard');

  async function handlePickFile() {
    try {
      setStatus('loading');
      setMessage(null);
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'text/plain', 'application/csv', '*/*'],
        copyToCacheDirectory: true,
      });
      if (result.canceled) { setStatus('idle'); return; }

      const content = await readAsStringAsync(result.assets[0].uri);
      const parsed = csvFormat === 'kraken' ? parseKrakenTradesCsv(content) : parseCsv(content, displayCurrency);

      if (!parsed.success) { setStatus('error'); setMessage(parsed.error); return; }

      for (const purchase of parsed.purchases) await addPurchase(purchase);

      setImportedCount(parsed.purchases.length);
      setStatus('success');
      setTimeout(() => { onImported(); onBack(); }, 1500);
    } catch {
      setStatus('error');
      setMessage(t('import.errorFile'));
    }
  }

  const successLabel = importedCount === 1
    ? t('import.successCount_one', { count: importedCount })
    : t('import.successCount_other', { count: importedCount });

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-zinc-900">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, gap: 16 }} keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View className="bg-brand-card rounded-3xl border border-white/10 p-5">
          <View className="mb-1 flex-row items-center gap-3">
            <Pressable onPress={onBack} android_ripple={{ color: '#ffffff20', radius: 22 }}
              className="bg-brand-cardAlt h-11 w-11 items-center justify-center rounded-2xl">
              <ArrowLeft size={18} color="#ffffff" />
            </Pressable>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white">{t('import.title')}</Text>
              <Text className="text-brand-muted mt-0.5 text-sm">{t('import.subtitle')}</Text>
            </View>
          </View>
        </View>

        {/* Sélecteur de format */}
        <View className="bg-brand-card gap-3 rounded-3xl border border-white/10 p-5">
          <Text className="text-base font-bold text-white">{t('import.sourceLabel')}</Text>
          <View className="flex-row gap-3">
            {(['standard', 'kraken'] as CsvFormat[]).map((fmt) => (
              <Pressable
                key={fmt}
                onPress={() => setCsvFormat(fmt)}
                android_ripple={{ color: '#F7931A30' }}
                className={`flex-1 items-center rounded-2xl border py-3 ${
                  csvFormat === fmt ? 'bg-brand-orange/15 border-brand-orange' : 'bg-brand-cardAlt border-white/10'
                }`}>
                <Text className={`text-sm font-semibold ${csvFormat === fmt ? 'text-brand-orange' : 'text-white/50'}`}>
                  {fmt === 'standard' ? t('import.standardFormat') : t('import.krakenExport')}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Info format */}
        {csvFormat === 'standard' ? (
          <View className="bg-brand-card gap-4 rounded-3xl border border-white/10 p-5">
            <View className="flex-row items-center gap-2">
              <FileText size={18} color="#F7931A" />
              <Text className="text-base font-bold text-white">{t('import.expectedFormatTitle')}</Text>
            </View>
            <Text className="text-brand-muted text-sm leading-5">{t('import.expectedFormatDesc')}</Text>
            <View className="bg-brand-cardAlt gap-2 rounded-2xl p-4">
              <Text className="text-brand-orange font-mono text-xs">boughtAt,amount,buyPrice,fee,currency,note</Text>
              <View className="h-px bg-white/10" />
              <Text className="font-mono text-xs text-white/60">2026-01-15,500,95000,2.5,{displayCurrency},</Text>
              <Text className="font-mono text-xs text-white/60">2026-02-01,300,98000,1.5,USD,</Text>
            </View>
            <View className="gap-2">
              <FormatRow col="boughtAt" desc={t('import.colBoughtAt')} required label={t('import.required')} />
              <FormatRow col="amount" desc={t('import.colAmount')} required label={t('import.required')} />
              <FormatRow col="buyPrice" desc={t('import.colBuyPrice')} required label={t('import.required')} />
              <FormatRow col="fee" desc={t('import.colFee')} required label={t('import.required')} />
              <FormatRow col="currency" desc={t('import.colCurrency', { defaultCurrency: displayCurrency })} label={t('import.required')} />
              <FormatRow col="note" desc={t('import.colNote')} label={t('import.required')} />
            </View>
            <Pressable
              onPress={() => handleDownloadExample(displayCurrency)}
              android_ripple={{ color: '#F7931A30' }}
              className="bg-brand-orange/10 border-brand-orange/30 flex-row items-center justify-center gap-2 rounded-2xl border py-3">
              <Download size={16} color="#F7931A" />
              <Text className="text-brand-orange text-sm font-semibold">{t('import.downloadExample')}</Text>
            </Pressable>
          </View>
        ) : (
          <View className="bg-brand-card gap-4 rounded-3xl border border-white/10 p-5">
            <View className="flex-row items-center gap-2">
              <FileText size={18} color="#F7931A" />
              <Text className="text-base font-bold text-white">{t('import.krakenTitle')}</Text>
            </View>
            <Text className="text-brand-muted text-sm leading-5">{t('import.krakenDesc')}</Text>
            <View className="bg-brand-cardAlt gap-2 rounded-2xl p-4">
              <Text className="text-brand-orange font-mono text-xs">Colonnes utilisées automatiquement :</Text>
              <View className="h-px bg-white/10" />
              <FormatRow col="pair" desc={t('import.krakenColPair')} label={t('import.required')} />
              <FormatRow col="time" desc={t('import.krakenColTime')} label={t('import.required')} />
              <FormatRow col="price" desc={t('import.krakenColPrice')} label={t('import.required')} />
              <FormatRow col="cost" desc={t('import.krakenColCost')} label={t('import.required')} />
              <FormatRow col="fee" desc={t('import.krakenColFee')} label={t('import.required')} />
              <FormatRow col="vol" desc={t('import.krakenColVol')} label={t('import.required')} />
            </View>
            <Text className="text-brand-muted text-xs leading-4">{t('import.krakenNote')}</Text>
          </View>
        )}

        {/* Zone upload */}
        <Pressable
          onPress={handlePickFile}
          disabled={status === 'loading'}
          android_ripple={{ color: '#F7931A30' }}
          className="bg-brand-card border-brand-orange/40 items-center gap-4 rounded-3xl border-2 border-dashed p-8">
          {status === 'loading' ? (
            <>
              <ActivityIndicator color="#F7931A" size="large" />
              <Text className="text-brand-muted text-sm">{t('import.reading')}</Text>
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle size={48} color="#22C55E" />
              <Text className="text-center text-lg font-bold text-emerald-400">{successLabel}</Text>
            </>
          ) : (
            <>
              <View className="bg-brand-orange/10 rounded-full p-4">
                <Upload size={32} color="#F7931A" />
              </View>
              <View className="items-center gap-1">
                <Text className="text-base font-bold text-white">{t('import.selectFile')}</Text>
                <Text className="text-brand-muted text-center text-sm">{t('import.selectFileHint')}</Text>
              </View>
            </>
          )}
        </Pressable>

        {/* Erreur */}
        {status === 'error' && message && (
          <View className="gap-3 rounded-3xl border border-red-500/30 bg-red-950 p-5">
            <View className="flex-row items-center gap-2">
              <AlertCircle size={18} color="#EF4444" />
              <Text className="font-bold text-red-400">{t('import.errorTitle')}</Text>
            </View>
            <Text className="text-sm leading-5 text-red-300">{message}</Text>
            <Pressable onPress={handlePickFile} android_ripple={{ color: '#EF444430' }}
              className="items-center rounded-2xl border border-red-500/30 bg-red-500/20 py-3">
              <Text className="font-semibold text-red-400">{t('common.retry')}</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function FormatRow({ col, desc, required, label }: { col: string; desc: string; required?: boolean; label: string }) {
  return (
    <View className="flex-row items-start gap-2">
      <Text className="text-brand-orange mt-0.5 font-mono text-xs">{col}</Text>
      {required && (
        <View className="bg-brand-orange/20 rounded px-1">
          <Text className="text-brand-orange text-xs">{label}</Text>
        </View>
      )}
      <Text className="text-brand-muted flex-1 text-xs">{desc}</Text>
    </View>
  );
}
