import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toggleRsvp, toggleSaved } from '../store/eventsSlice';
import { selectGoingIds, selectSavedIds } from '../store/selectors';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

/** Shared RSVP + bookmark logic for cards and the details page. Sends guests to login first. */
export default function useRsvp(event) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const going = useSelector((s) => selectGoingIds(s, user?.email)).includes(event.id);
  const saved = useSelector((s) => selectSavedIds(s, user?.email)).includes(event.id);
  const attendees = (event.baseGoing || 0) + useSelector(
    (s) => Object.values(s.events.rsvps).filter((list) => list.includes(event.id)).length
  );
  const full = !!event.capacity && attendees >= Number(event.capacity) && !going;
  const spotsLeft = event.capacity ? Math.max(0, Number(event.capacity) - attendees) : null;

  const requireLogin = () => {
    if (user) return true;
    toast('Please log in first.');
    navigate('/login', { state: { from: location } });
    return false;
  };

  const toggle = () => {
    if (!requireLogin()) return;
    if (full) { toast('Sorry, this event is full.'); return; }
    dispatch(toggleRsvp({ id: event.id, email: user.email }));
    toast(going ? 'RSVP removed.' : `You're going to ${event.title}.`);
  };

  const toggleBookmark = () => {
    if (!requireLogin()) return;
    dispatch(toggleSaved({ id: event.id, email: user.email }));
    toast(saved ? 'Removed from saved events.' : 'Saved to your dashboard.');
  };

  return { going, saved, attendees, full, spotsLeft, toggle, toggleBookmark };
}
