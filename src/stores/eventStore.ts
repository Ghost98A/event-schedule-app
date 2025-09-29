import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Event } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface EventState {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  removeEvent: (id: string) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
}

export const useEventStore = create<EventState>(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, { ...event, id: uuidv4() }],
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
      updateEvent: (id, updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updatedEvent } : event
          ),
        })),
    }),
    {
      name: 'event-storage',
    }
  )
);