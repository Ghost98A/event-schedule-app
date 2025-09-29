import { useState, createContext, useContext } from 'react'
import './App.css'

type Theme = 'light' | 'dark'

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({ 
  theme: 'light',
  toggleTheme: () => {}
})

type Event = {
  id: number
  title: string
  date: string
  time: string
  description: string
}

function App() {
  const [theme, setTheme] = useState<Theme>('light')
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

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`container ${theme}`}>
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

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
    </ThemeContext.Provider>
  )
}

export default App