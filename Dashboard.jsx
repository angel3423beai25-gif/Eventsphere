import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { selectEvents, selectGoingIds, selectSavedIds } from '../store/selectors';
import { deleteEvent } from '../store/eventsSlice';
import EventCard from '../components/EventCard';
import Field from '../components/Field';
import Skeleton from '../components/Skeleton';
import useForm from '../hooks/useForm';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { passwordStrength } from '../utils/format';

const tabClass = ({ isActive }) => `chip${isActive ? ' active' : ''}`;

// Parent route: stats + tab bar, and the active child route renders inside <Outlet />
export default function Dashboard() {
  useDocumentTitle('Dashboard');
  const { user } = useAuth();
  const events = useSelector(selectEvents);
  const going = useSelector((s) => selectGoingIds(s, user.email));
  const saved = useSelector((s) => selectSavedIds(s, user.email));
  const hosting = events.filter((e) => e.hostEmail === user.email);
  return (
    <section>
      <div className="section-heading"><h1 className="page-title">Your dashboard</h1><p>Signed in as {user.email}</p></div>
      <div className="stat-row">
        <div className="stat"><strong>{going.length}</strong><span>Going</span></div>
        <div className="stat"><strong>{saved.length}</strong><span>Saved</span></div>
        <div className="stat"><strong>{hosting.length}</strong><span>Hosting</span></div>
      </div>
      <div className="filter-chips tabs">
        <NavLink to="going" className={tabClass}>Going</NavLink>
        <NavLink to="saved" className={tabClass}>Saved</NavLink>
        <NavLink to="hosting" className={tabClass}>Hosting</NavLink>
        <NavLink to="profile" className={tabClass}>Profile</NavLink>
      </div>
      <Outlet />
    </section>
  );
}

function useMyEvents(selectIds) {
  const { user } = useAuth();
  const ids = useSelector((s) => selectIds(s, user.email));
  const events = useSelector(selectEvents);
  const status = useSelector((s) => s.events.status);
  return { status, list: events.filter((e) => ids.includes(e.id)) };
}

export function GoingTab() {
  const { status, list } = useMyEvents(selectGoingIds);
  if (status !== 'succeeded') return <Skeleton count={3} />;
  if (!list.length) return <div className="empty-state"><p>You have not RSVP&apos;d to anything yet.</p><Link to="/events" className="btn btn-primary">Find events</Link></div>;
  return <div className="events-grid">{list.map((e) => <EventCard key={e.id} event={e} />)}</div>;
}

export function SavedTab() {
  const { status, list } = useMyEvents(selectSavedIds);
  if (status !== 'succeeded') return <Skeleton count={3} />;
  if (!list.length) return <div className="empty-state"><p>No saved events. Tap the heart on any event to save it.</p><Link to="/events" className="btn btn-primary">Browse events</Link></div>;
  return <div className="events-grid">{list.map((e) => <EventCard key={e.id} event={e} />)}</div>;
}

export function HostingTab() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const toast = useToast();
  const status = useSelector((s) => s.events.status);
  const events = useSelector(selectEvents).filter((e) => e.hostEmail === user.email);
  if (status !== 'succeeded') return <Skeleton count={3} />;
  if (!events.length) return <div className="empty-state"><p>You are not hosting any events yet.</p><Link to="/host" className="btn btn-primary">Host an event</Link></div>;
  const remove = (e) => { if (window.confirm(`Delete "${e.title}"?`)) { dispatch(deleteEvent(e.id)); toast('Event deleted.'); } };
  return (
    <div className="events-grid">
      {events.map((e) => (
        <div key={e.id} className="hosted-item">
          <EventCard event={e} />
          <div className="card-actions">
            <Link to={`/events/${e.id}/edit`} className="btn btn-ghost btn-sm">Edit</Link>
            <button type="button" className="btn btn-danger btn-sm" onClick={() => remove(e)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfileTab() {
  const { user, updateName, changePassword } = useAuth();
  const toast = useToast();
  const [pwError, setPwError] = useState('');

  const nameForm = useForm({
    initialValues: { name: user.name },
    validate: (v) => (v.name.trim().length >= 2 ? {} : { name: 'Name should be at least 2 characters.' }),
    onSubmit: (v) => { updateName(v.name.trim()); toast('Profile updated.'); }
  });
  const pwForm = useForm({
    initialValues: { current: '', next: '', confirm: '' },
    validate: (v) => {
      const e = {};
      if (!v.current) e.current = 'Enter your current password.';
      if (v.next.length < 8) e.next = 'New password must be at least 8 characters.';
      if (v.confirm !== v.next) e.confirm = 'Passwords do not match.';
      return e;
    },
    onSubmit: (v, { reset }) => {
      const res = changePassword({ current: v.current, next: v.next });
      if (!res.ok) { setPwError(res.error); return; }
      setPwError(''); reset(); toast('Password changed.');
    }
  });
  const strength = passwordStrength(pwForm.values.next);

  return (
    <div className="profile-grid">
      <form className="event-form" onSubmit={nameForm.handleSubmit} noValidate>
        <h2>Your details</h2>
        <p className="muted">Member since {user.joined || 'today'} · {user.email}</p>
        <Field label="Full name" form={nameForm} name="name" autoComplete="name" />
        <button type="submit" className="btn btn-primary">Save name</button>
      </form>
      <form className="event-form" onSubmit={pwForm.handleSubmit} noValidate>
        <h2>Change password</h2>
        {pwError && <p className="auth-error" role="alert">{pwError}</p>}
        <Field label="Current password" form={pwForm} name="current" type="password" autoComplete="current-password" />
        <Field label="New password" form={pwForm} name="next" type="password" autoComplete="new-password"
          hint={<span className={`password-strength ${strength.className}`}>{strength.label}</span>} />
        <Field label="Confirm new password" form={pwForm} name="confirm" type="password" autoComplete="new-password" />
        <button type="submit" className="btn btn-primary">Update password</button>
      </form>
    </div>
  );
}
