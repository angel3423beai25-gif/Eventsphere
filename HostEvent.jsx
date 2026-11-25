import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEvent } from '../store/eventsSlice';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import EventForm from '../components/EventForm';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function HostEvent() {
  useDocumentTitle('Host an event');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const onSubmit = (v, { reset }) => {
    const action = addEvent(
      { title: v.title.trim(), date: v.date, time: v.time, category: v.category, location: v.location.trim(),
        price: Number(v.price), capacity: v.capacity === '' ? null : Number(v.capacity), description: v.description.trim() },
      { email: user.email, name: user.name }
    );
    dispatch(action);
    reset();
    toast('Published. Your event is live.');
    navigate(`/events/${action.payload.id}`);
  };

  return (
    <section>
      <div className="section-heading"><h1 className="page-title">Host an event</h1>
        <p>Fill in the form and watch the preview update. Your event appears in the feed instantly.</p></div>
      <EventForm submitLabel="Publish event" onSubmit={onSubmit}
        initialValues={{ title: '', date: '', time: '', category: '', location: '', price: '0', capacity: '', description: '' }} />
    </section>
  );
}
