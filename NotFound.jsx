import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page not found');
  return (
    <section className="center-block">
      <p className="big-404">404</p>
      <h1>Page not found</h1>
      <p>That address does not lead anywhere on EventSphere.</p>
      <Link to="/" className="btn btn-primary">Go home</Link>
    </section>
  );
}
