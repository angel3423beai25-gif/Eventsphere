import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectEventById, selectEvents } from '../store/selectors';
import { deleteEvent } from '../store/eventsSlice';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import useRsvp from '../hooks/useRsvp';
import useDocumentTitle from '../hooks/useDocumentTitle';
import EventCard, { CardCover } from '../components/EventCard';
import Skeleton from '../components/Skeleton';
import { formatDate, formatPrice, formatTime } from '../utils/format';

function Details({ event }) {
  useDocumentTitle(event.title);
  const { going, saved, attendees, full, spotsLeft, toggle, toggleBookmark } = useRsvp(event);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const related = useSelector(selectEvents).filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);
  const isHost = user && event.hostEmail === user.email;

  const remove = () => {
    if (!window.confirm('Delete this event?')) return;
    dispatch(deleteEvent(event.id));
    toast('Event deleted.');
    navigate('/dashboard/hosting');
  };
  const share = async () => {
    try { await navigator.clipboard.writeText(window.location.href); toast('Link copied to clipboard.'); }
    catch { toast('Could not copy. Copy the address bar instead.'); }
  };

  return (
    <section>
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link> / <Link to="/events">Events</Link> / <span>{event.title}</span></nav>
      <div className="details">
        <CardCover category={event.category} price={event.price} />
        <div className="details-body">
          <span className="tag">{event.category}</span>
          <h1>{event.title}</h1>
          <ul className="detail-list">
            <li>📅 {formatDate(event.date)}{event.time ? ` at ${formatTime(event.time)}` : ''}</li>
            <li>📍 {event.location}</li>
            <li>🎟️ {formatPrice(event.price)}</li>
            <li>👥 {attendees} going{spotsLeft !== null ? ` · ${spotsLeft} spots left` : ''}</li>
            <li>🙋 Hosted by {event.hostName || 'EventSphere Team'}</li>
          </ul>
          <p className="details-desc">{event.description}</p>
          <div className="card-actions wrap">
            <button type="button" className={`btn btn-primary rsvp-btn${going ? ' is-going' : ''}`} aria-pressed={going}
              onClick={toggle} disabled={full}>{going ? "You're going ✓" : full ? 'Event full' : 'RSVP to this event'}</button>
            <button type="button" className="btn btn-ghost" onClick={toggleBookmark} aria-pressed={saved}>{saved ? '♥ Saved' : '♡ Save'}</button>
            <button type="button" className="btn btn-ghost" onClick={share}>Share link</button>
            {isHost && <Link to={`/events/${event.id}/edit`} className="btn btn-ghost">Edit</Link>}
            {isHost && <button type="button" className="btn btn-danger" onClick={remove}>Delete</button>}
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <>
          <div className="section-heading"><h2>More {event.category} events</h2></div>
          <div className="events-grid">{related.map((e) => <EventCard key={e.id} event={e} />)}</div>
        </>
      )}
    </section>
  );
}

export default function EventDetails() {
  const { id } = useParams(); // the :id segment from /events/:id
  const event = useSelector((s) => selectEventById(s, id));
  const status = useSelector((s) => s.events.status);
  useDocumentTitle('Event');
  if (status !== 'succeeded') return <Skeleton count={1} />;
  if (!event) {
    return (
      <section className="center-block">
        <h1>Event not found</h1>
        <p>It may have been deleted, or the link is wrong.</p>
        <Link to="/events" className="btn btn-primary">Back to events</Link>
      </section>
    );
  }
  return <Details event={event} />;
}
