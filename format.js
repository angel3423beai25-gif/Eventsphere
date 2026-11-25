export const CATEGORIES = ['Music', 'Tech', 'Sports', 'Art', 'Business', 'Food'];
export const CATEGORY_META = {
  Music: { emoji: '🎵', hue: 285 }, Tech: { emoji: '💻', hue: 215 }, Sports: { emoji: '⚽', hue: 140 },
  Art: { emoji: '🎨', hue: 335 }, Business: { emoji: '💼', hue: 30 }, Food: { emoji: '🍜', hue: 10 }
};
export const metaFor = (c) => CATEGORY_META[c] || { emoji: '🎉', hue: 250 };
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

export const formatTime = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};
export const formatPrice = (p) => (!p || Number(p) === 0 ? 'Free' : `₹${Number(p).toLocaleString('en-IN')}`);
export const todayISO = () => new Date().toLocaleDateString('en-CA');
export const cityOf = (location) => location.split(',').pop().trim();

export function passwordStrength(pw) {
  if (!pw) return { label: '', className: '' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { label: 'Weak password', className: 'weak' };
  if (score <= 3) return { label: 'Medium strength', className: 'medium' };
  return { label: 'Strong password', className: 'strong' };
}
