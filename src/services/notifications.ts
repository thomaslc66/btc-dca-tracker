import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const IS_EXPO_GO = Constants.appOwnership === 'expo';

if (!IS_EXPO_GO) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export type ReminderFrequency = 'daily' | 'weekly' | 'monthly';

const NOTIFICATION_ID = 'dca-reminder';

export async function requestNotificationPermission(): Promise<boolean> {
  if (IS_EXPO_GO) return false;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleReminder(
  frequency: ReminderFrequency,
  hour: number,
  minute: number,
  weekday?: number,
  dayOfMonth?: number
): Promise<void> {
  if (IS_EXPO_GO) return;
  await cancelReminder();

  const granted = await requestNotificationPermission();
  if (!granted) return;

  let trigger: Notifications.NotificationTriggerInput;

  if (frequency === 'daily') {
    trigger = { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute };
  } else if (frequency === 'weekly') {
    trigger = {
      type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
      weekday: weekday ?? 2,
      hour,
      minute,
    };
  } else {
    trigger = {
      type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
      day: dayOfMonth ?? 1,
      hour,
      minute,
    };
  }

  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_ID,
    content: {
      title: '₿ DCA Reminder',
      body: "C'est le moment d'acheter du Bitcoin !",
    },
    trigger,
  });
}

export async function cancelReminder(): Promise<void> {
  if (IS_EXPO_GO) return;
  await Notifications.cancelScheduledNotificationAsync(NOTIFICATION_ID);
}

export async function getReminderStatus(): Promise<boolean> {
  if (IS_EXPO_GO) return false;
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  return scheduled.some((n) => n.identifier === NOTIFICATION_ID);
}
