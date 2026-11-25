# EventSphere: Rubric Guide

## Component 2 (25 marks): where each item lives

| Rubric item | Files | What to explain |
|---|---|---|
| **React Navigation layout and page structure** (8) | `src/App.jsx`, `components/Layout.jsx`, `Navbar.jsx`, `ProtectedRoute.jsx`, `pages/Dashboard.jsx`, `pages/Events.jsx` | Layout route renders Navbar + `<Outlet/>` + Footer. `NavLink` active state. Dynamic `/events/:id` (`useParams`). Nested `/dashboard/*` tabs. Protected routes redirect to `/login` and return via `location.state`. Query string `?category=` (`useSearchParams`). `useNavigate`, `Navigate`, 404 `*` route. |
| **Context API and state architecture** (8) | `context/AuthContext.jsx`, `ThemeContext.jsx`, `ToastContext.jsx`, `main.jsx` | Three contexts with custom hooks (`useAuth`, `useTheme`, `useToast`) and memoised values. Rule: Context for app-wide services, Redux for shared domain data, `useState` for local UI (menu, accordion, form values). Provider order is in `main.jsx`. |
| **Intro to Redux Toolkit** (5) | `store/index.js`, `eventsSlice.js`, `filtersSlice.js`, `selectors.js` | `configureStore`, `createSlice` (Immer), `prepare` callback, `createAsyncThunk` + `extraReducers` (loading skeletons), `createSelector` (memoised filtering), `useSelector`/`useDispatch`, store persisted via `subscribe`. |
| **Form handling in React** (4) | `hooks/useForm.js`, `components/Field.jsx`, `EventForm.jsx`, Login, Signup, Contact, Profile, Newsletter | Controlled inputs, derived validation (never stale), touched/submitted logic, reset, password strength meter, live preview of form values, one hook reused by 7 forms. |

## Data flow to demonstrate
Click RSVP -> `useRsvp` -> `dispatch(toggleRsvp)` -> reducer -> `store.subscribe` saves to localStorage -> every `useSelector` re-renders (card, details, dashboard).

## Component 1 (5 marks): presentation
Use the included `EventSphere_Presentation.pptx`: Problem -> Pages -> Router -> State architecture -> Redux flow -> Forms -> Live demo.
Tips: speak to each rubric topic by name, show the demo live, keep it about 8 minutes.

## Likely viva questions
- Why Context AND Redux? (different kinds of state)
- What does `<Outlet/>` do? (renders the matched child route in a parent layout)
- Why derive form errors? (cannot go stale)
- What is `createAsyncThunk`? (async action with pending/fulfilled/rejected states)
- Why `createSelector`? (memoised, recomputes only when inputs change)
- Is auth secure? (No. Front-end demo. A real app needs a backend.)
