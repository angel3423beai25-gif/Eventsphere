import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const USERS_KEY = 'eventsphere_users';
const SESSION_KEY = 'eventsphere_session';

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ } };

// Demo-only hash. NOT real security: there is no backend.
function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
  return String(h);
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read(SESSION_KEY, null));

  const startSession = (u) => {
    const session = { name: u.name, email: u.email, joined: u.joined };
    write(SESSION_KEY, session);
    setUser(session);
  };

  const signup = useCallback(({ name, email, password }) => {
    const users = read(USERS_KEY, []);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with that email already exists.' };
    }
    const newUser = { name, email, passwordHash: simpleHash(password), joined: new Date().toLocaleDateString('en-CA') };
    write(USERS_KEY, [...users, newUser]);
    startSession(newUser);
    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const found = read(USERS_KEY, []).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.passwordHash !== simpleHash(password)) {
      return { ok: false, error: 'Incorrect email or password.' };
    }
    startSession(found);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setUser(null);
  }, []);

  const updateName = useCallback((name) => {
    setUser((current) => {
      if (!current) return current;
      const users = read(USERS_KEY, []).map((u) => (u.email === current.email ? { ...u, name } : u));
      write(USERS_KEY, users);
      const session = { ...current, name };
      write(SESSION_KEY, session);
      return session;
    });
    return { ok: true };
  }, []);

  const changePassword = useCallback(({ current, next }) => {
    const users = read(USERS_KEY, []);
    const me = users.find((u) => user && u.email === user.email);
    if (!me || me.passwordHash !== simpleHash(current)) return { ok: false, error: 'Current password is incorrect.' };
    write(USERS_KEY, users.map((u) => (u.email === me.email ? { ...u, passwordHash: simpleHash(next) } : u)));
    return { ok: true };
  }, [user]);

  // useMemo keeps the context value stable so consumers do not re-render needlessly
  const value = useMemo(
    () => ({ user, signup, login, logout, updateName, changePassword }),
    [user, signup, login, logout, updateName, changePassword]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
