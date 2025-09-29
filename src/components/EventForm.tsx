import { useState } from 'react';
import { format } from 'date-fns';
import { useEventStore } from '../stores/eventStore';

export const EventForm = () => {
  const addEvent = useEventStore((state) => state.addEvent);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [alarmTime, setAlarmTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      title,
      description,
      startDate: new Date(startDate),
      alarmEnabled,
      alarmTime: alarmTime ? new Date(alarmTime) : undefined,
    });
    setTitle('');
    setDescription('');
    setStartDate('');
    setAlarmEnabled(false);
    setAlarmTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={alarmEnabled}
          onChange={(e) => setAlarmEnabled(e.target.checked)}
        />
        Enable Alarm
      </label>
      {alarmEnabled && (
        <input
          type="datetime-local"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
        />
      )}
      <button type="submit">Add Event</button>
    </form>
  );
};