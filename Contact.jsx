import useForm from '../hooks/useForm';
import Field from '../components/Field';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useToast } from '../context/ToastContext';
import { EMAIL_PATTERN } from '../utils/format';

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(v.email.trim())) e.email = 'Please enter a valid email.';
  if (!v.topic) e.topic = 'Please choose a topic.';
  if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
  return e;
};

export default function Contact() {
  useDocumentTitle('Contact');
  const toast = useToast();
  const form = useForm({
    initialValues: { name: '', email: '', topic: '', message: '' },
    validate,
    onSubmit: (_v, { reset }) => { toast('Message sent. We will reply soon.'); reset(); }
  });
  return (
    <section>
      <div className="section-heading"><h1 className="page-title">Contact us</h1><p>Questions, feedback, or an event we should know about?</p></div>
      <div className="contact-layout">
        <form className="event-form" onSubmit={form.handleSubmit} noValidate>
          <Field label="Your name" form={form} name="name" autoComplete="name" />
          <Field label="Email" form={form} name="email" type="email" autoComplete="email" />
          <Field label="Topic" form={form} name="topic" as="select">
            <option value="">Select...</option><option>General question</option><option>Report a problem</option><option>Suggest a feature</option>
          </Field>
          <Field label="Message" form={form} name="message" as="textarea" rows={5}
            hint={<span className="char-count">{form.values.message.length} characters</span>} />
          <button type="submit" className="btn btn-primary">Send message</button>
        </form>
        <aside className="contact-info">
          <h2>Other ways to reach us</h2>
          <p>📧 hello@eventsphere.example</p>
          <p>📍 Chandigarh, India</p>
          <p>🕘 Mon to Fri, 10am to 6pm</p>
        </aside>
      </div>
    </section>
  );
}
