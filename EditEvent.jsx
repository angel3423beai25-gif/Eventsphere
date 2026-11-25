import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent } from '../store/eventsSlice';
import { selectEventById } from '../store/selectors';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import EventForm from '../components/EventForm';
import Skeleton from '../components/Skeleton';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function EditEvent() {
  useDocumentTitle('Edit event');
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();
  const event = useSelector((s) => selectEventById(s, id));
  const status = useSelector((s) => s.events.status);

  if (status !== 'succeeded') return <Skeleton count={1} />;
  if (!event) return <section className="center-block"><h1>Event not found</h1><Link to="/events" className="btn btn-primary">Back to events</Link></section>;
  if (event.hostEmail !== user.email) return <Navigate to={`/events/${id}`} replace />; // only the host may edit

  const onSubmit = (v) => {
    dispatch(updateEvent({ id, changes: {
      title: v.title.trim(), date: v.date, time: v.time, category: v.category, location: v.location.trim(),
      price: Number(v.price), capacity: v.capacity === '' ? null : Number(v.capacity), description: v.description.trim()
    } }));
    toast('Event updated.');
    navigate(`/events/${id}`);
  };

  return (
    <section>
      <div className="section-heading"><h1 className="page-title">Edit event</h1></div>
      <EventForm submitLabel="Save changes" onSubmit={onSubmit}
        initialValues={{ title: event.title, date: event.date, time: event.time || '', category: event.category, location: event.location,
          price: String(event.price ?? 0), capacity: event.capacity ? String(event.capacity) : '', description: event.description }} />
    </section>
  );
}
