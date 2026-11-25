import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import useDocumentTitle from '../hooks/useDocumentTitle';

const VALUES = [
  ['🔎', 'Discover', 'One searchable feed for every meetup, gig, workshop and fixture.'],
  ['⚡', 'Act fast', 'RSVP and save events in one tap once you are logged in.'],
  ['🚀', 'Host easily', 'Publish an event in under a minute with a live preview.']
];
const FAQ = [
  ['Is EventSphere free?', 'Yes. Browsing, RSVPing and hosting are free. Individual events may charge their own ticket price.'],
  ['Do I need an account?', 'You can browse without one. An account is needed to RSVP, save events or host.'],
  ['Where is my data stored?', 'This is a front-end college project, so data is stored in your own browser (localStorage).'],
  ['Can I edit or delete my event?', 'Yes. Open it from Dashboard > Hosting, or from the event page, to edit or delete it.']
];

export default function About() {
  useDocumentTitle('About');
  return (
    <section>
      <div className="section-heading"><h1 className="page-title">About EventSphere</h1></div>
      <p className="about-copy">EventSphere brings every event around you into one place, so you do not have to check five different
        group chats to know what is on. Search or filter by category, city and price, RSVP in one tap, and keep track of what you are
        going to. If you organise something yourself, publish it in minutes and it shows up for everyone else.</p>
      <div className="steps">
        {VALUES.map(([icon, title, text]) => <div key={title} className="step"><span className="step-icon">{icon}</span><h3>{title}</h3><p>{text}</p></div>)}
      </div>
      <div className="section-heading"><h2>Built with</h2></div>
      <div className="filter-chips">
        {['React', 'React Router', 'Context API', 'Redux Toolkit', 'Controlled forms', 'Vite'].map((t) => <span key={t} className="chip static">{t}</span>)}
      </div>
      <div className="section-heading"><h2>Frequently asked questions</h2></div>
      <Accordion items={FAQ} />
      <p className="about-cta"><Link to="/events" className="btn btn-primary">Browse events</Link></p>
    </section>
  );
}
