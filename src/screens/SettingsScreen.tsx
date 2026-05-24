import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Bell, Check, Target } from 'lucide-react-native';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useBtcGoal } from '@/contexts/BtcGoalContext';
import { SUPPORTED_CURRENCIES } from '@/services/exchangeRate';
import { useI18n, Lang } from '@/i18n';
import {
  cancelReminder,
  getReminderStatus,
  IS_EXPO_GO,
  ReminderFrequency,
  scheduleReminder,
} from '@/services/notifications';

const LANGS: Lang[] = ['fr', 'en', 'de', 'es', 'ru'];
const FREQUENCIES: ReminderFrequency[] = ['daily', 'weekly', 'monthly'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const DAYS_OF_MONTH = Array.from({ length: 28 }, (_, i) => i + 1);

const REMINDER_DAYS: Record<Lang, string[]> = {
  fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
};

type Props = { onBack: () => void };

export default function SettingsScreen({ onBack }: Props) {
  const insets = useSafeAreaInsets();
  const { displayCurrency, setDisplayCurrency } = useCurrency();
  const { btcGoal, setBtcGoal } = useBtcGoal();
  const { t, language, setLanguage } = useI18n();
  const [goalInput, setGoalInput] = useState(btcGoal ? String(btcGoal) : '');
  const [goalSaved, setGoalSaved] = useState(false);

  const [reminderOn, setReminderOn] = useState(false);
  const [frequency, setFrequency] = useState<ReminderFrequency>('weekly');
  const [weekday, setWeekday] = useState(2); // lundi (1=dim…7=sam dans expo, mais on affiche 0=dim..6=sam)
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [hour, setHour] = useState(9);

  useEffect(() => {
    getReminderStatus().then(setReminderOn);
  }, []);

  async function handleToggleReminder(value: boolean) {
    if (!value) {
      try { await cancelReminder(); } catch {}
      setReminderOn(false);
      return;
    }
    await saveReminder();
  }

  async function saveReminder() {
    try {
      // weekday pour expo : 1=dim, 2=lun, …, 7=sam
      const expoWeekday = weekday === 0 ? 1 : weekday + 1;
      await scheduleReminder(frequency, hour, 0, expoWeekday, dayOfMonth);
      const active = await getReminderStatus();
      setReminderOn(active);
      if (active) Alert.alert('', t('settings.reminderSaved'));
      else Alert.alert('', t('settings.reminderPermissionDenied'));
    } catch {
      Alert.alert('', t('settings.reminderPermissionDenied'));
      setReminderOn(false);
    }
  }

  const freqLabels: Record<ReminderFrequency, string> = {
    daily: t('settings.reminderFreqDaily'),
    weekly: t('settings.reminderFreqWeekly'),
    monthly: t('settings.reminderFreqMonthly'),
  };

  const reminderDays = REMINDER_DAYS[language];

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-zinc-900">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, gap: 16 }}
        keyboardShouldPersistTaps="handled">

        {/* Header */}
        <View className="bg-brand-card rounded-3xl border border-white/10 p-5">
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={onBack}
              android_ripple={{ color: '#ffffff20', radius: 22 }}
              className="bg-brand-cardAlt h-11 w-11 items-center justify-center rounded-2xl">
              <ArrowLeft size={18} color="#ffffff" />
            </Pressable>
            <View className="flex-1">
              <Text className="text-2xl font-bold text-white">{t('settings.title')}</Text>
              <Text className="text-brand-muted mt-0.5 text-sm">{t('settings.subtitle')}</Text>
            </View>
          </View>
        </View>

        {/* Rappel DCA */}
        <View className="bg-brand-card gap-4 rounded-3xl border border-white/10 p-5">
          <View className="flex-row items-center gap-2">
            <Bell size={18} color="#F7931A" />
            <Text className="text-base font-bold text-white">{t('settings.reminderSection')}</Text>
          </View>
          <Text className="text-brand-muted text-sm leading-5">{t('settings.reminderDesc')}</Text>

          {IS_EXPO_GO ? (
            <View className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
              <Text className="text-amber-400 text-sm font-semibold">Development build required</Text>
              <Text className="text-amber-400/70 text-xs mt-1">
                Local notifications are not supported in Expo Go. Build a dev client to use this feature.
              </Text>
            </View>
          ) : (<>

          {/* Toggle */}
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-white">{t('settings.reminderEnabled')}</Text>
            <Switch
              value={reminderOn}
              onValueChange={handleToggleReminder}
              trackColor={{ false: '#3f3f3f', true: '#F7931A60' }}
              thumbColor={reminderOn ? '#F7931A' : '#9CA3AF'}
            />
          </View>

          {/* Options (visibles même si off pour configurer avant d'activer) */}
          <View className="gap-4">
            {/* Fréquence */}
            <View className="gap-2">
              <Text className="text-brand-muted text-xs font-semibold uppercase tracking-wide">
                {t('settings.reminderFrequency')}
              </Text>
              <View className="flex-row gap-2">
                {FREQUENCIES.map((f) => (
                  <Pressable
                    key={f}
                    onPress={() => setFrequency(f)}
                    className={`flex-1 items-center rounded-xl border py-2 ${
                      frequency === f
                        ? 'bg-brand-orange/15 border-brand-orange'
                        : 'bg-brand-cardAlt border-white/10'
                    }`}>
                    <Text className={`text-xs font-semibold ${frequency === f ? 'text-brand-orange' : 'text-white/50'}`}>
                      {freqLabels[f]}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Jour de la semaine (weekly) */}
            {frequency === 'weekly' && (
              <View className="gap-2">
                <Text className="text-brand-muted text-xs font-semibold uppercase tracking-wide">
                  {t('settings.reminderDay')}
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {reminderDays.map((day, i) => (
                    <Pressable
                      key={i}
                      onPress={() => setWeekday(i)}
                      className={`items-center rounded-xl border px-3 py-2 ${
                        weekday === i
                          ? 'bg-brand-orange/15 border-brand-orange'
                          : 'bg-brand-cardAlt border-white/10'
                      }`}>
                      <Text className={`text-xs font-semibold ${weekday === i ? 'text-brand-orange' : 'text-white/50'}`}>
                        {day}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}

            {/* Jour du mois (monthly) */}
            {frequency === 'monthly' && (
              <View className="gap-2">
                <Text className="text-brand-muted text-xs font-semibold uppercase tracking-wide">
                  {t('settings.reminderDayOfMonth')}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row gap-2">
                    {DAYS_OF_MONTH.map((d) => (
                      <Pressable
                        key={d}
                        onPress={() => setDayOfMonth(d)}
                        className={`h-9 w-9 items-center justify-center rounded-xl border ${
                          dayOfMonth === d
                            ? 'bg-brand-orange/15 border-brand-orange'
                            : 'bg-brand-cardAlt border-white/10'
                        }`}>
                        <Text className={`text-xs font-semibold ${dayOfMonth === d ? 'text-brand-orange' : 'text-white/50'}`}>
                          {d}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}

            {/* Heure */}
            <View className="gap-2">
              <Text className="text-brand-muted text-xs font-semibold uppercase tracking-wide">
                {t('settings.reminderTime')}
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {HOURS.map((h) => (
                    <Pressable
                      key={h}
                      onPress={() => setHour(h)}
                      className={`h-9 w-12 items-center justify-center rounded-xl border ${
                        hour === h
                          ? 'bg-brand-orange/15 border-brand-orange'
                          : 'bg-brand-cardAlt border-white/10'
                      }`}>
                      <Text className={`text-xs font-semibold ${hour === h ? 'text-brand-orange' : 'text-white/50'}`}>
                        {`${h}:00`}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Bouton Enregistrer (si rappel actif, met à jour) */}
            {reminderOn && (
              <Pressable
                onPress={saveReminder}
                className="bg-brand-orange items-center rounded-2xl py-3">
                <Text className="font-bold text-black">{t('settings.reminderSaved')}</Text>
              </Pressable>
            )}
          </View>
          </>)}
        </View>

        {/* Objectif BTC */}
        <View className="bg-brand-card gap-4 rounded-3xl border border-white/10 p-5">
          <View className="flex-row items-center gap-2">
            <Target size={18} color="#F7931A" />
            <Text className="text-base font-bold text-white">{t('goal.title')}</Text>
          </View>
          <Text className="text-brand-muted text-sm">{t('goal.settingLabel')}</Text>
          <View className="flex-row items-center gap-3">
            <View className="flex-1 rounded-2xl border border-white/10 bg-brand-cardAlt px-4 py-3">
              <TextInput
                value={goalInput}
                onChangeText={setGoalInput}
                placeholder={t('goal.settingPlaceholder')}
                placeholderTextColor="#6B7280"
                keyboardType="decimal-pad"
                className="text-white text-sm"
              />
            </View>
            <Pressable
              onPress={async () => {
                const val = parseFloat(goalInput.replace(',', '.'));
                if (!isNaN(val) && val > 0) {
                  await setBtcGoal(val);
                  setGoalSaved(true);
                  setTimeout(() => setGoalSaved(false), 2000);
                }
              }}
              className={`flex-row items-center gap-1.5 rounded-2xl px-4 py-3 ${goalSaved ? 'bg-emerald-500' : 'bg-brand-orange'}`}>
              {goalSaved ? <Check size={15} color="black" /> : null}
              <Text className="font-bold text-black">{t('goal.settingSave')}</Text>
            </Pressable>
          </View>
          {btcGoal !== null && (
            <Pressable
              onPress={async () => { await setBtcGoal(null); setGoalInput(''); }}
              className="items-center rounded-2xl border border-white/10 py-2.5">
              <Text className="text-brand-muted text-sm">{t('goal.settingClear')}</Text>
            </Pressable>
          )}
        </View>

        {/* Langue */}
        <View className="bg-brand-card gap-4 rounded-3xl border border-white/10 p-5">
          <Text className="text-base font-bold text-white">{t('settings.languageSection')}</Text>
          <View className="gap-2">
            {LANGS.map((lang) => {
              const selected = lang === language;
              return (
                <Pressable
                  key={lang}
                  onPress={() => setLanguage(lang)}
                  android_ripple={{ color: '#F7931A20' }}
                  className={`flex-row items-center justify-between rounded-2xl border p-4 ${
                    selected
                      ? 'bg-brand-orange/10 border-brand-orange/60'
                      : 'bg-brand-cardAlt border-white/10'
                  }`}>
                  <Text className={`font-semibold ${selected ? 'text-brand-orange' : 'text-white'}`}>
                    {t(`langLabels.${lang}`)}
                  </Text>
                  {selected && <Check size={18} color="#F7931A" />}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Devise de référence */}
        <View className="bg-brand-card gap-4 rounded-3xl border border-white/10 p-5">
          <Text className="text-base font-bold text-white">{t('settings.currencySection')}</Text>
          <Text className="text-brand-muted text-sm leading-5">{t('settings.currencyDesc')}</Text>
          <View className="gap-2">
            {SUPPORTED_CURRENCIES.map((currency) => {
              const selected = currency === displayCurrency;
              return (
                <Pressable
                  key={currency}
                  onPress={() => setDisplayCurrency(currency)}
                  android_ripple={{ color: '#F7931A20' }}
                  className={`flex-row items-center justify-between rounded-2xl border p-4 ${
                    selected
                      ? 'bg-brand-orange/10 border-brand-orange/60'
                      : 'bg-brand-cardAlt border-white/10'
                  }`}>
                  <View>
                    <Text className={`font-semibold ${selected ? 'text-brand-orange' : 'text-white'}`}>
                      {currency}
                    </Text>
                    <Text className="text-brand-muted text-xs mt-0.5">
                      {t(`currencyLabels.${currency}`)}
                    </Text>
                  </View>
                  {selected && <Check size={18} color="#F7931A" />}
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
