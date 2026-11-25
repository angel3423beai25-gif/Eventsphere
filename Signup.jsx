import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import useForm from '../hooks/useForm';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Field from '../components/Field';
import { EMAIL_PATTERN, passwordStrength } from '../utils/format';

export default function Signup() {
  useDocumentTitle('Sign up');
  const { user, signup } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState('');
  const from = location.state?.from?.pathname || '/';

  const form = useForm({
    initialValues: { name: '', email: '', password: '', confirm: '' },
    validate: (v) => {
      const e = {};
      if (!v.name.trim()) e.name = 'Please enter your name.';
      if (!EMAIL_PATTERN.test(v.email.trim())) e.email = 'Please enter a valid email.';
      if (v.password.length < 8) e.password = 'Password must be at least 8 characters.';
      if (v.confirm !== v.password) e.confirm = 'Passwords do not match.';
      return e;
    },
    onSubmit: (v) => {
      const res = signup({ name: v.name.trim(), email: v.email.trim(), password: v.password });
      if (!res.ok) { setAuthError(res.error); return; }
      toast('Account created. Welcome to EventSphere.');
      navigate(from, { replace: true });
    }
  });
  const strength = passwordStrength(form.values.password);

  if (user) return <Navigate to={from} replace />;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p className="auth-subtext">Save events, RSVP, and host your own in a few clicks.</p>
        {authError && <p className="auth-error" role="alert">{authError}</p>}
        <form className="auth-form" onSubmit={form.handleSubmit} noValidate>
          <Field label="Full name" form={form} name="name" placeholder="Jasleen Kaur" autoComplete="name" />
          <Field label="Email" form={form} name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          <Field label="Password" form={form} name="password" type="password" placeholder="At least 8 characters" autoComplete="new-password"
            hint={<span className={`password-strength ${strength.className}`}>{strength.label}</span>} />
          <Field label="Confirm password" form={form} name="confirm" type="password" placeholder="Re-enter your password" autoComplete="new-password" />
          <button type="submit" className="btn btn-primary">Create account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login" state={location.state}>Log in</Link></p>
      </div>
    </div>
  );
}
