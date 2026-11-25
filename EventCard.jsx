import { Link } from 'react-router-dom';
import useRsvp from '../hooks/useRsvp';
import { formatDate, formatPrice, formatTime, metaFor } from '../utils/format';

export function CardCover({ category, price }) {
  const { emoji, hue } = metaFor(category);
  return (
    <div className="card-cover" style={{ '--hue': hue }} aria-hidden="true">
      <span className="cover-emoji">{emoji}</span>
      <span className="price-badge">{formatPrice(price)}</span>
    </div>
  );
}

export default function EventCard({ event }) {
  const { going, saved, full, spotsLeft, toggle, toggleBookmark } = useRsvp(event);
  return (
    <article className="event-card">
      <Link to={`/events/${event.id}`} tabIndex={-1} aria-hidden="true"><CardCover category={event.category} price={event.price} /></Link>
      <div className="card-body">
        <div className="card-top">
          <span className="tag">{event.category}</span>
          <button type="button" className={`icon-btn bookmark${saved ? ' on' : ''}`} aria-pressed={saved}
            aria-label={saved ? 'Remove from saved' : 'Save event'} onClick={toggleBookmark}>{saved ? '♥' : '♡'}</button>
        </div>
        <h3><Link to={`/events/${event.id}`} className="plain-link">{event.title}</Link></h3>
        <div className="event-meta">
          <span>📅 {formatDate(event.date)}{event.time ? ` · ${formatTime(event.time)}` : ''}</span>
          <span>📍 {event.location}</span>
        </div>
        <p className="event-desc">{event.description}</p>
        {spotsLeft !== null && <p className={`spots${spotsLeft <= 10 ? ' low' : ''}`}>{spotsLeft === 0 ? 'Sold out' : `${spotsLeft} spots left`}</p>}
        <div className="card-actions">
          <Link to={`/events/${event.id}`} className="btn btn-ghost btn-sm">Details</Link>
          <button type="button" className={`btn btn-primary btn-sm rsvp-btn${going ? ' is-going' : ''}`}
            aria-pressed={going} onClick={toggle} disabled={full}>
            {going ? "You're going ✓" : full ? 'Full' : 'RSVP'}
          </button>
        </div>
      </div>
    </article>
  );
}
