import { createSelector } from '@reduxjs/toolkit';
import { cityOf } from '../utils/format';

const EMPTY = [];
export const selectEvents = (s) => s.events.items;
export const selectStatus = (s) => s.events.status;
export const selectFilters = (s) => s.filters;
export const selectGoingIds = (s, email) => (email && s.events.rsvps[email]) || EMPTY;
export const selectSavedIds = (s, email) => (email && s.events.saved[email]) || EMPTY;
export const selectEventById = (s, id) => s.events.items.find((e) => e.id === id);

// Memoised: recomputes only when events or filters change
export const selectFiltered = createSelector([selectEvents, selectFilters], (items, f) => {
  const term = f.search.trim().toLowerCase();
  return items
    .filter((ev) => {
      const okCat = f.category === 'All' || ev.category === f.category;
      const okCity = f.city === 'All' || cityOf(ev.location) === f.city;
      const okPrice = f.price === 'all' || (f.price === 'free' ? !Number(ev.price) : Number(ev.price) > 0);
      const okTerm = !term || [ev.title, ev.location, ev.description].some((t) => t.toLowerCase().includes(term));
      return okCat && okCity && okPrice && okTerm;
    })
    .sort((a, b) => {
      if (f.sort === 'date-desc') return b.date.localeCompare(a.date);
      if (f.sort === 'name-asc') return a.title.localeCompare(b.title);
      if (f.sort === 'price-asc') return Number(a.price) - Number(b.price);
      return a.date.localeCompare(b.date);
    });
});

export const selectCities = createSelector([selectEvents], (items) =>
  [...new Set(items.map((e) => cityOf(e.location)))].sort());

export const selectStats = createSelector([selectEvents], (items) => ({
  count: items.length,
  categories: new Set(items.map((e) => e.category)).size,
  cities: new Set(items.map((e) => cityOf(e.location))).size
}));

export const selectUpcoming = createSelector([selectEvents], (items) =>
  items.slice().sort((a, b) => a.date.localeCompare(b.date)));
