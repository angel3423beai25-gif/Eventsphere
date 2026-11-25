import { configureStore } from '@reduxjs/toolkit';
import eventsReducer, { EVENTS_STORAGE_KEY } from './eventsSlice';
import filtersReducer from './filtersSlice';

const store = configureStore({ reducer: { events: eventsReducer, filters: filtersReducer } });

// Persist events, RSVPs and saved events so they survive a refresh
store.subscribe(() => {
  const { items, rsvps, saved, status } = store.getState().events;
  if (status !== 'succeeded') return;
  try { localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify({ items, rsvps, saved })); } catch { /* storage blocked */ }
});

export default store;
