import { useState } from 'react'
import './App.css'

interface EventForm {
  title: string;
  date: string;
  time: string;
  description: string;
  alarmEnabled: boolean;
  alarmTime: string;
}

function App() {
  const [formData, setFormData] = useState<EventForm>({
    title: '',
    date: '',
    time: '',
    description: '',
    alarmEnabled: false,
    alarmTime: '30',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Event created:', formData)
    // Here you would typically save the event
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="event-form-container">
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="title">Event Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date*</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time*</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="form-group alarm-section">
          <div className="alarm-toggle">
            <input
              type="checkbox"
              id="alarmEnabled"
              name="alarmEnabled"
              checked={formData.alarmEnabled}
              onChange={handleChange}
            />
            <label htmlFor="alarmEnabled">Enable Alarm</label>
          </div>

          {formData.alarmEnabled && (
            <div className="alarm-time-select">
              <label htmlFor="alarmTime">Remind me before:</label>
              <select
                id="alarmTime"
                name="alarmTime"
                value={formData.alarmTime}
                onChange={handleChange}
              >
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">Create Event</button>
      </form>
    </div>
  )
}

export default App