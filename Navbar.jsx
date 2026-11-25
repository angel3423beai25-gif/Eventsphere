import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/events', label: 'Events' },
  { to: '/host', label: 'Host an event' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const toast = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]); // close mobile menu after navigating

  const handleLogout = () => { logout(); toast('You have been logged out.'); navigate('/'); };

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary">
        <Link to="/" className="logo"><span className="logo-orb" aria-hidden="true" />EventSphere</Link>

        <button className="mobile-nav-toggle" aria-expanded={open} aria-controls="nav-menu"
          aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          <span /><span /><span />
        </button>

        <div id="nav-menu" className={`nav-menu${open ? ' open' : ''}`}>
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>{l.label}</NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-auth">
            <button type="button" className="icon-btn" onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? '☀️' : '🌙'}</button>
            {user ? (
              <>
                <Link to="/dashboard" className="nav-user">Hi, <strong>{user.name.split(' ')[0]}</strong></Link>
                <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">Log in</Link>
                <Link to="/signup" className="btn btn-primary btn-sm">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
