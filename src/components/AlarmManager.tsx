import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useEventStore } from '../stores/eventStore';
import { useAlarmStore } from '../stores/alarmStore';
import { v4 as uuidv4 } from 'uuid';

export const AlarmManager = () => {
  const events = useEventStore((state) => state.events);
  const { settings, addNotification } = useAlarmStore();

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      events.forEach((event) => {
        if (event.alarmEnabled && event.alarmTime) {
          const alarmTime = new Date(event.alarmTime);
          if (Math.abs(now.getTime() - alarmTime.getTime()) < 1000) {
            const notification = {
              id: uuidv4(),
              eventId: event.id,
              message: `Alarm: ${event.title}`,
              timestamp: now,
            };
            addNotification(notification);
            if (settings.visualAlert) {
              toast(notification.message, {
                position: 'top-right',
                autoClose: 5000,
              });
            }
          }
        }
      });
    };

    const interval = setInterval(checkAlarms, 1000);
    return () => clearInterval(interval);
  }, [events, settings, addNotification]);

  return null;
};