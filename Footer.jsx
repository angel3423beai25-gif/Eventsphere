import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <p className="footer-brand">EventSphere</p>
          <p className="muted">Discover what is happening around you and host what is next.</p>
        </div>
        <div className="footer-links">
          <Link to="/events">Events</Link><Link to="/host">Host an event</Link>
          <Link to="/dashboard">Dashboard</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link>
        </div>
      </div>
      <p className="muted footer-note">Built for the React college project &middot; EventSphere &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}
