import useForm from '../hooks/useForm';
import Field from './Field';
import { CardCover } from './EventCard';
import { CATEGORIES, formatDate, formatPrice, formatTime, todayISO } from '../utils/format';

const validate = (v) => {
  const e = {};
  if (v.title.trim().length < 3) e.title = 'Title should be at least 3 characters.';
  if (!v.date) e.date = 'Please pick a date.';
  else if (v.date < todayISO()) e.date = 'Date should be today or later.';
  if (!v.time) e.time = 'Please pick a start time.';
  if (!v.category) e.category = 'Please choose a category.';
  if (!v.location.includes(',') || v.location.trim().length < 5) e.location = 'Use "Place, City" (for example: Sector 62, Noida).';
  if (v.price === '' || Number(v.price) < 0 || Number.isNaN(Number(v.price))) e.price = 'Enter 0 for free, or a price.';
  if (v.capacity !== '' && (!Number.isInteger(Number(v.capacity)) || Number(v.capacity) < 1)) e.capacity = 'Capacity must be a whole number, 1 or more.';
  if (v.description.trim().length < 20) e.description = 'Description should be at least 20 characters.';
  return e;
};

/** Shared create/edit form with a live preview card. Used by HostEvent and EditEvent. */
export default function EventForm({ initialValues, submitLabel, onSubmit }) {
  const form = useForm({ initialValues, validate, onSubmit });
  const v = form.values;
  return (
    <div className="host-layout">
      <form className="event-form" onSubmit={form.handleSubmit} noValidate>
        <Field label="Event title" form={form} name="title" placeholder="e.g. Indie Founders Meetup" />
        <div className="form-row-split">
          <Field label="Date" form={form} name="date" type="date" min={todayISO()} />
          <Field label="Start time" form={form} name="time" type="time" />
        </div>
        <div className="form-row-split">
          <Field label="Category" form={form} name="category" as="select">
            <option value="">Select...</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </Field>
          <Field label="Price (INR, 0 = free)" form={form} name="price" type="number" min="0" />
        </div>
        <Field label="Location (Place, City)" form={form} name="location" placeholder="e.g. Sector 62, Noida" />
        <Field label="Capacity (optional)" form={form} name="capacity" type="number" min="1" placeholder="Leave empty for unlimited" />
        <Field label="Description" form={form} name="description" as="textarea" rows={5}
          placeholder="What is it about? Who should come?"
          hint={<span className="char-count">{v.description.length} characters (minimum 20)</span>} />
        <button type="submit" className="btn btn-primary">{submitLabel}</button>
      </form>
      <aside className="preview" aria-label="Live preview">
        <p className="muted preview-label">Live preview</p>
        <article className="event-card">
          <CardCover category={v.category || 'Other'} price={v.price === '' ? 0 : v.price} />
          <div className="card-body">
            <span className="tag">{v.category || 'Category'}</span>
            <h3>{v.title || 'Your event title'}</h3>
            <div className="event-meta">
              <span>📅 {v.date ? formatDate(v.date) : 'Date'}{v.time ? ` · ${formatTime(v.time)}` : ''}</span>
              <span>📍 {v.location || 'Location'}</span>
              <span>🎟️ {formatPrice(v.price)}</span>
            </div>
            <p className="event-desc">{v.description || 'Your description appears here as you type.'}</p>
          </div>
        </article>
      </aside>
    </div>
  );
}
