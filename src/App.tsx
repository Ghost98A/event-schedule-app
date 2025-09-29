import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EventForm } from './components/EventForm';
import { EventList } from './components/EventList';
import { AlarmManager } from './components/AlarmManager';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Event Scheduler</h1>
      <EventForm />
      <EventList />
      <AlarmManager />
      <ToastContainer />
    </div>
  );
}

export default App;