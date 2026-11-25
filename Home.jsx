import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectStats, selectUpcoming } from '../store/selectors';
import { setCategory } from '../store/filtersSlice';
import EventCard from '../components/EventCard';
import Skeleton from '../components/Skeleton';
import Field from '../components/Field';
import useForm from '../hooks/useForm';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import { CATEGORIES, EMAIL_PATTERN, metaFor } from '../utils/format';

const STEPS = [
  ['Browse', 'Search or filter the feed by category, city, price or keyword.'],
  ['RSVP', 'Log in once, then RSVP in one tap and save events you like.'],
  ['Host', 'Publish your own event in under a minute and watch it appear instantly.']
];
const REVIEWS = [
  ['I found a workshop and two meetups in a single evening.', 'Aman, B.Tech student'],
  ['Hosting our band night took less than a minute.', 'Simran, Music society'],
  ['Finally one place instead of five group chats.', 'Rohit, Startup cell']
];

export default function Home() {
  useDocumentTitle('Home');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const stats = useSelector(selectStats);
  const status = useSelector(selectStatus);
  const upcoming = useSelector(selectUpcoming).slice(0, 3);

  const newsletter = useForm({
    initialValues: { email: '' },
    validate: (v) => (EMAIL_PATTERN.test(v.email.trim()) ? {} : { email: 'Please enter a valid email.' }),
    onSubmit: (_v, { reset }) => { toast('Subscribed. We will email you new events.'); reset(); }
  });

  const goCategory = (c) => { dispatch(setCategory(c)); navigate('/events'); };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Events near you</p>
          <h1>Find what&apos;s happening.<br />Host what&apos;s next.</h1>
          <p className="hero-sub">EventSphere pulls together meetups, gigs, workshops and launches into one clean, searchable feed
            and lets you put your own event into orbit in under a minute.</p>
          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary">Browse events</Link>
            <Link to="/host" className="btn btn-ghost">Host an event</Link>
          </div>
          <dl className="hero-stats">
            <div><dt>{stats.count}</dt><dd>live events</dd></div>
            <div><dt>{stats.categories}</dt><dd>categories</dd></div>
            <div><dt>{stats.cities}</dt><dd>cities</dd></div>
          </dl>
        </div>
        <div className="orbit" aria-hidden="true">
          <div className="orbit-ring ring-1" /><div className="orbit-ring ring-2" /><div className="orbit-ring ring-3" />
          <div className="orbit-core" />
          <div className="orbit-dot dot-a" /><div className="orbit-dot dot-b" /><div className="orbit-dot dot-c" />
        </div>
      </section>

      <section>
        <div className="section-heading"><h2>Browse by category</h2><p>Pick a category to jump straight to matching events.</p></div>
        <div className="category-grid">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className="category-tile" style={{ '--hue': metaFor(c).hue }} onClick={() => goCategory(c)}>
              <span>{metaFor(c).emoji}</span>{c}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading row-between">
          <div><h2>Coming up next</h2><p>The three events closest on the calendar.</p></div>
          <Link to="/events" className="btn btn-ghost">See all events</Link>
        </div>
        {status === 'succeeded' ? (
          <div className="events-grid">{upcoming.map((e) => <EventCard key={e.id} event={e} />)}</div>
        ) : <Skeleton count={3} />}
      </section>

      <section>
        <div className="section-heading"><h2>How it works</h2></div>
        <ol className="steps">
          {STEPS.map(([title, text], i) => (
            <li key={title} className="step"><span className="step-num">{i + 1}</span><h3>{title}</h3><p>{text}</p></li>
          ))}
        </ol>
      </section>

      <section>
        <div className="section-heading"><h2>What students say</h2></div>
        <div className="reviews">
          {REVIEWS.map(([quote, who]) => <figure key={who} className="review"><blockquote>&ldquo;{quote}&rdquo;</blockquote><figcaption>{who}</figcaption></figure>)}
        </div>
      </section>

      <section className="newsletter">
        <div><h2>Never miss an event</h2><p className="muted">Get a short email when new events are published.</p></div>
        <form onSubmit={newsletter.handleSubmit} noValidate className="newsletter-form">
          <Field label="Email" form={newsletter} name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          <button type="submit" className="btn btn-primary">Subscribe</button>
        </form>
      </section>
    </>
  );
}
