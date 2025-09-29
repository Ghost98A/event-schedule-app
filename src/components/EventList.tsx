import { useEventStore } from '../stores/eventStore';
import { format } from 'date-fns';

export const EventList = () => {
  const events = useEventStore((state) => state.events);
  const removeEvent = useEventStore((state) => state.removeEvent);

  return (
    <div className="event-list">
      <h2>Scheduled Events</h2>
      {events.map((event) => (
        <div key={event.id} className="event-item">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Start: {format(new Date(event.startDate), 'PPpp')}</p>
          {event.alarmEnabled && event.alarmTime && (
            <p>Alarm: {format(new Date(event.alarmTime), 'PPpp')}</p>
          )}
          <button onClick={() => removeEvent(event.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};