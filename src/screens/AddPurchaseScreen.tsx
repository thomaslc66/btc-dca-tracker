import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ArrowLeft, Bitcoin, CalendarDays, ReceiptText } from 'lucide-react-native';
import { usePurchasesRepository } from '@/db/purchases';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useI18n } from '@/i18n';
import { SUPPORTED_CURRENCIES } from '@/services/exchangeRate';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = { onBack: () => void; onSaved?: () => void };

function parseNumber(value: string) {
  const normalized = value.replace(',', '.').trim();
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}

export default function AddPurchaseScreen({ onBack, onSaved }: Props) {
  const { addPurchase } = usePurchasesRepository();
  const insets = useSafeAreaInsets();
  const { displayCurrency } = useCurrency();
  const { t } = useI18n();

  const [boughtAt, setBoughtAt] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [fee, setFee] = useState('');
  const [currency, setCurrency] = useState(displayCurrency);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const amountValue = parseNumber(amount);
  const buyPriceValue = parseNumber(buyPrice);
  const feeValue = parseNumber(fee);
  const boughtAtFormatted = `${boughtAt.getFullYear()}-${`${boughtAt.getMonth() + 1}`.padStart(2, '0')}-${`${boughtAt.getDate()}`.padStart(2, '0')}`;

  const btcPreview = useMemo(() => {
    if (amountValue <= 0 || buyPriceValue <= 0) return 0;
    return amountValue / buyPriceValue;
  }, [amountValue, buyPriceValue]);

  const totalInvestedPreview = useMemo(() => {
    if (amountValue <= 0) return 0;
    return amountValue + Math.max(feeValue, 0);
  }, [amountValue, feeValue]);

  async function handleSave() {
    if (saving) return;
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!boughtAtFormatted.trim()) { setErrorMessage(t('addPurchase.errorNoDate')); return; }
    if (amountValue <= 0) { setErrorMessage(t('addPurchase.errorAmount')); return; }
    if (buyPriceValue <= 0) { setErrorMessage(t('addPurchase.errorPrice')); return; }
    if (feeValue < 0) { setErrorMessage(t('addPurchase.errorFee')); return; }

    try {
      setSaving(true);
      await addPurchase({
        boughtAt: boughtAtFormatted,
        amount: amountValue,
        btcAmount: btcPreview,
        fee: feeValue,
        currency,
        note: note.trim() || null,
        buyPrice: buyPriceValue,
      });
      setSuccessMessage(t('addPurchase.successMessage'));
      setTimeout(() => { onSaved?.(); onBack(); }, 500);
    } catch {
      setErrorMessage(t('addPurchase.errorSave'));
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-zinc-900">
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, gap: 16 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={100}>

        <View className="bg-brand-card rounded-3xl border border-black/10 p-5">
          <View className="mb-4 flex-row items-center">
            <Pressable
              onPress={onBack}
              className="bg-brand-cardAlt h-11 w-11 items-center justify-center rounded-2xl border border-black/5">
              <ArrowLeft size={18} color="#F5F0E8" />
            </Pressable>
            <View className="ml-3 flex-1">
              <Text className="text-brand-text text-2xl font-bold">{t('addPurchase.title')}</Text>
              <Text className="text-brand-muted mt-1 text-sm">{t('addPurchase.subtitle')}</Text>
            </View>
          </View>

          <View className="bg-brand-cardAlt rounded-2xl border border-black/5 p-4">
            <Text className="text-brand-text text-base font-semibold">{t('addPurchase.preview')}</Text>
            <View className="mt-3 gap-2">
              <Text className="text-brand-muted">
                {t('addPurchase.estimatedBtc')}{' '}
                <Text className="text-brand-text font-semibold">{btcPreview.toFixed(8)} BTC</Text>
              </Text>
              <Text className="text-brand-muted">
                {t('addPurchase.totalInvested')}{' '}
                <Text className="text-brand-text font-semibold">
                  {totalInvestedPreview.toFixed(2)} {currency}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View className="bg-brand-card gap-4 rounded-3xl border border-black/10 p-5">
          {errorMessage ? (
            <View className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <Text className="font-medium text-red-700">{errorMessage}</Text>
            </View>
          ) : null}
          {successMessage ? (
            <View className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
              <Text className="font-medium text-green-700">{successMessage}</Text>
            </View>
          ) : null}

          {/* Devise */}
          <View>
            <Text className="text-brand-text mb-2 font-semibold">{t('addPurchase.currency')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {SUPPORTED_CURRENCIES.map((c) => (
                  <Pressable
                    key={c}
                    onPress={() => setCurrency(c)}
                    className={`rounded-xl border px-3 py-2 ${
                      currency === c ? 'bg-brand-orange/15 border-brand-orange' : 'bg-brand-cardAlt border-white/10'
                    }`}>
                    <Text className={`text-sm font-semibold ${currency === c ? 'text-brand-orange' : 'text-white/60'}`}>
                      {c}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Date */}
          <View>
            <Text className="text-brand-text mb-2 font-semibold">{t('addPurchase.date')}</Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="flex-row items-center rounded-2xl border border-black/10 bg-white px-4 py-3">
              <CalendarDays size={18} color="#64748B" />
              <Text className="ml-3 text-slate-900">{boughtAtFormatted}</Text>
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={boughtAt}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(_, d) => { setShowDatePicker(false); if (d) setBoughtAt(d); }}
              />
            )}
          </View>

          {/* Montant */}
          <View>
            <Text className="text-brand-text mb-2 font-semibold">{t('addPurchase.amount', { currency })}</Text>
            <View className="rounded-2xl border border-black/10 bg-white px-4 py-3">
              <TextInput value={amount} onChangeText={setAmount} placeholder="100" keyboardType="decimal-pad" placeholderTextColor="#94A3B8" className="text-slate-900" />
            </View>
          </View>

          {/* Prix BTC */}
          <View>
            <Text className="text-brand-text mb-2 font-semibold">{t('addPurchase.buyPrice', { currency })}</Text>
            <View className="flex-row items-center rounded-2xl border border-black/10 bg-white px-4 py-3">
              <Bitcoin size={18} color="#F7931A" />
              <TextInput value={buyPrice} onChangeText={setBuyPrice} placeholder="95000" keyboardType="decimal-pad" placeholderTextColor="#94A3B8" className="ml-3 flex-1 text-slate-900" />
            </View>
          </View>

          {/* Frais */}
          <View>
            <Text className="text-brand-text mb-2 font-semibold">{t('addPurchase.fee', { currency })}</Text>
            <View className="rounded-2xl border border-black/10 bg-white px-4 py-3">
              <TextInput value={fee} onChangeText={setFee} placeholder="0" keyboardType="decimal-pad" placeholderTextColor="#94A3B8" className="text-slate-900" />
            </View>
          </View>

          {/* Note */}
          <View>
            <Text className="text-brand-text mb-2 font-semibold">{t('addPurchase.note')}</Text>
            <View className="min-h-[96px] flex-row items-start rounded-2xl border border-black/10 bg-white px-4 py-3">
              <ReceiptText size={18} color="#64748B" style={{ marginTop: 2 }} />
              <TextInput value={note} onChangeText={setNote} placeholder={t('addPurchase.notePlaceholder')} placeholderTextColor="#94A3B8" multiline textAlignVertical="top" className="text-brand-text ml-3 flex-1" />
            </View>
          </View>

          <View className="flex-row gap-4 pb-10 pt-2">
            <Pressable onPress={onBack} disabled={saving} className="flex-1 items-center rounded-2xl border border-slate-200 bg-white px-4 py-4">
              <Text className="font-semibold text-slate-800">{t('common.cancel')}</Text>
            </Pressable>
            <Pressable onPress={handleSave} disabled={saving} className={`flex-1 items-center rounded-2xl px-4 py-4 ${saving ? 'bg-amber-300' : 'bg-brand-orange'}`}>
              <Text className="font-bold text-black">{saving ? t('addPurchase.saving') : t('addPurchase.saveButton')}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
