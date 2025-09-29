import { useState, useEffect } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { ThemeToggle } from './components/ThemeToggle'

type Event = {
  id: number
  title: string
  date: string
  time: string
  description: string
  alarm?: boolean
}

function App() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Meeting',
      date: '2024-02-01', 
      time: '10:00',
      description: 'Weekly team sync',
      alarm: false
    }
  ])

  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({ 
    title: '',
    date: '',
    time: '',
    description: '',
    alarm: false
  })

  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date()
      events.forEach(event => {
        if (event.alarm) {
          const eventTime = new Date(`${event.date}T${event.time}`)
          if (Math.abs(eventTime.getTime() - now.getTime()) < 60000) { // Within 1 minute
            if (Notification.permission === 'granted') {
              new Notification(`Event Reminder: ${event.title}`, {
                body: `Your event "${event.title}" is starting now!`,
              })
            }
          }
        }
      })
    }

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission()
    }

    const interval = setInterval(checkAlarms, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [events])

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
      description: '',
      alarm: false
    })
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  const toggleAlarm = (id: number) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, alarm: !event.alarm } : event
    ))
  }

  return (
    <ThemeProvider>
      <div className="container">
        <ThemeToggle />

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
          <label>
            <input
              type="checkbox"
              checked={newEvent.alarm}
              onChange={e => setNewEvent(prev => ({ ...prev, alarm: e.target.checked }))}
            />
            Set Alarm
          </label>
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
              <label>
                <input
                  type="checkbox"
                  checked={event.alarm}
                  onChange={() => toggleAlarm(event.id)}
                />
                Alarm
              </label>
              <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App