import { useState } from 'react'
import './App.css'

type Event = {
  id: number
  title: string
  date: string
  time: string
  description: string
}

function App() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Meeting',
      date: '2024-02-01',
      time: '10:00',
      description: 'Weekly team sync'
    }
  ])

  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ 
    title: '',
    date: '',
    time: '',
    description: ''
  })

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return
    
    setEvents(prev => [...prev, {
      ...newEvent,
      id: Math.max(0, ...prev.map(e => e.id)) + 1
    }])

    setNewEvent({
      title: '',
      date: '',
      time: '',
      description: ''
    })
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  return (
    <div className="container">
      <h1>Event Schedule</h1>
      
      <div className="add-event">
        <h2>Add New Event</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={e => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={e => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
        />
        <input
          type="time"
          value={newEvent.time}
          onChange={e => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={e => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>

      <div className="events-list">
        <h2>Scheduled Events</h2>
        {events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map(event => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Time: {event.time}</p>
            {event.description && <p>Description: {event.description}</p>}
            <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App