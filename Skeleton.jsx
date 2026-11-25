export default function Skeleton({ count = 6 }) {
  return (
    <div className="events-grid" aria-busy="true" aria-label="Loading events">
      {Array.from({ length: count }, (_, i) => <div key={i} className="event-card skeleton" />)}
    </div>
  );
}
