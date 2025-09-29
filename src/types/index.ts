export interface Event {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  alarmEnabled: boolean;
  alarmTime?: Date;
  alarmSound?: string;
}

export interface AlarmSettings {
  sound: string;
  volume: number;
  visualAlert: boolean;
}

export interface Notification {
  id: string;
  eventId: string;
  message: string;
  timestamp: Date;
}