import { useState } from 'react'
import './App.css'

type EventData = {
  title: string
  date: string
  time: string
  description: string
  location: string
}

function EventPreview({ event }: { event: EventData }) {
  return (
    <div className="preview-card">
      <h3>{event.title || 'Event Title'}</h3>
      <p><strong>Date:</strong> {event.date || 'TBD'}</p>
      <p><strong>Time:</strong> {event.time || 'TBD'}</p>
      <p><strong>Location:</strong> {event.location || 'TBD'}</p>
      <p><strong>Description:</strong></p>
      <p>{event.description || 'No description provided'}</p>
    </div>
  )
}

function App() {
  const [showPreview, setShowPreview] = useState(true)
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    date: '',
    time: '',
    description: '',
    location: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEventData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="app-container">
      <h1>Event Creator</h1>
      
      <button 
        className="preview-toggle"
        onClick={() => setShowPreview(!showPreview)}
      >
        {showPreview ? 'Hide Preview' : 'Show Preview'}
      </button>

      <div className="content-wrapper">
        <div className="form-section">
          <form>
            <div className="form-group">
              <label htmlFor="title">Event Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={eventData.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
          </form>
        </div>

        {showPreview && (
          <div className="preview-section">
            <h2>Preview</h2>
            <EventPreview event={eventData} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App