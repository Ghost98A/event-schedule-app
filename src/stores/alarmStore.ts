import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AlarmSettings, Notification } from '../types';

interface AlarmState {
  settings: AlarmSettings;
  notifications: Notification[];
  updateSettings: (settings: Partial<AlarmSettings>) => void;
  addNotification: (notification: Notification) => void;
  clearNotification: (id: string) => void;
}

export const useAlarmStore = create<AlarmState>(
  persist(
    (set) => ({
      settings: {
        sound: 'default',
        volume: 1,
        visualAlert: true,
      },
      notifications: [],
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [...state.notifications, notification],
        })),
      clearNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
    }),
    {
      name: 'alarm-storage',
    }
  )
);