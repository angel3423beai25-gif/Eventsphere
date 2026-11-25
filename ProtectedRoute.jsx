import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  // Remember where the visitor was going so login can send them back
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
