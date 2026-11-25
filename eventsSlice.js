import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { seedEvents } from '../data/events';

export const EVENTS_STORAGE_KEY = 'eventsphere_state_v3';

function readSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(EVENTS_STORAGE_KEY));
    if (saved && Array.isArray(saved.items)) return saved;
  } catch { /* ignore corrupt storage */ }
  return null;
}

// createAsyncThunk: simulates fetching events from a server (shows loading skeletons).
export const loadEvents = createAsyncThunk(
  'events/load',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return readSaved() || { items: seedEvents(), rsvps: {}, saved: {} };
  },
  { condition: (_arg, { getState }) => getState().events.status === 'idle' }
);

const initialState = {
  items: [],
  rsvps: {},   // { [email]: [eventId, ...] }
  saved: {},   // { [email]: [eventId, ...] }
  status: 'idle' // idle | loading | succeeded | failed
};

const toggleInList = (map, email, id) => {
  const list = map[email] || (map[email] = []);
  const i = list.indexOf(id);
  if (i === -1) list.push(id); else list.splice(i, 1);
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: {
      reducer(state, action) { state.items.push(action.payload); },
      // prepare builds the payload (id, host info) before the reducer runs
      prepare(data, host) {
        return { payload: { ...data, id: nanoid(), hostEmail: host.email, hostName: host.name, baseGoing: 0 } };
      }
    },
    updateEvent(state, action) {
      const { id, changes } = action.payload;
      const ev = state.items.find((e) => e.id === id);
      if (ev) Object.assign(ev, changes);
    },
    deleteEvent(state, action) {
      state.items = state.items.filter((e) => e.id !== action.payload);
      [state.rsvps, state.saved].forEach((map) => {
        Object.keys(map).forEach((email) => { map[email] = map[email].filter((id) => id !== action.payload); });
      });
    },
    toggleRsvp(state, action) { toggleInList(state.rsvps, action.payload.email, action.payload.id); },
    toggleSaved(state, action) { toggleInList(state.saved, action.payload.email, action.payload.id); }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => { state.status = 'loading'; })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.rsvps = action.payload.rsvps || {};
        state.saved = action.payload.saved || {};
        state.status = 'succeeded';
      })
      .addCase(loadEvents.rejected, (state) => { state.status = 'failed'; });
  }
});

export const { addEvent, updateEvent, deleteEvent, toggleRsvp, toggleSaved } = eventsSlice.actions;
export default eventsSlice.reducer;
