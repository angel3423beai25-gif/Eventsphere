import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents } from './store/eventsSlice';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import HostEvent from './pages/HostEvent';
import EditEvent from './pages/EditEvent';
import Dashboard, { GoingTab, SavedTab, HostingTab, ProfileTab } from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector((s) => s.events.status);

  // Redux async thunk: load events once when the app starts
  useEffect(() => { if (status === 'idle') dispatch(loadEvents()); }, [status, dispatch]);

  return (
    <Routes>
      {/* Layout route: Navbar + <Outlet/> + Footer wrap every page */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="events/:id/edit" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="host" element={<ProtectedRoute><HostEvent /></ProtectedRoute>} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route index element={<Navigate to="going" replace />} />
          <Route path="going" element={<GoingTab />} />
          <Route path="saved" element={<SavedTab />} />
          <Route path="hosting" element={<HostingTab />} />
          <Route path="profile" element={<ProfileTab />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
