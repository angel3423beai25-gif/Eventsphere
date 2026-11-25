import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import useForm from '../hooks/useForm';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Field from '../components/Field';
import { EMAIL_PATTERN } from '../utils/format';

export default function Login() {
  useDocumentTitle('Log in');
  const { user, login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState('');
  const from = location.state?.from?.pathname || '/'; // where ProtectedRoute sent them from

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: (v) => {
      const e = {};
      if (!EMAIL_PATTERN.test(v.email.trim())) e.email = 'Please enter a valid email.';
      if (!v.password) e.password = 'Please enter your password.';
      return e;
    },
    onSubmit: (v) => {
      const res = login({ email: v.email.trim(), password: v.password });
      if (!res.ok) { setAuthError(res.error); return; }
      toast('Welcome back.');
      navigate(from, { replace: true });
    }
  });

  if (user) return <Navigate to={from} replace />; // already logged in

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p className="auth-subtext">Log in to RSVP, save events and manage the ones you host.</p>
        {authError && <p className="auth-error" role="alert">{authError}</p>}
        <form className="auth-form" onSubmit={form.handleSubmit} noValidate>
          <Field label="Email" form={form} name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          <Field label="Password" form={form} name="password" type="password" placeholder="Your password" autoComplete="current-password" />
          <button type="submit" className="btn btn-primary">Log in</button>
        </form>
        <p className="auth-switch">Don&apos;t have an account? <Link to="/signup" state={location.state}>Sign up</Link></p>
      </div>
    </div>
  );
}
