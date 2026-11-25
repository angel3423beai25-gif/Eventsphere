# EventSphere (React, Evaluation 2)

Multi-page, responsive event discovery and hosting website.
Stack: React 18, React Router 6, Context API, Redux Toolkit, Vite. No external images (works offline once installed).

## Run
See `START-HERE.txt`. Short version: `npm install` then `npm run dev`.

## Pages
| Route | Page | Access |
|---|---|---|
| `/` | Home: hero, categories, next events, steps, reviews, newsletter form | public |
| `/events` | Search, city/price/category filters, sort, load more (`?category=Music` works) | public |
| `/events/:id` | Details, RSVP, save, share link, related events | public |
| `/events/:id/edit` | Edit event (host only) | protected |
| `/host` | Host an event with live preview | protected |
| `/dashboard/going` `/saved` `/hosting` `/profile` | Nested dashboard tabs | protected |
| `/about`, `/contact` | About + FAQ accordion, Contact form | public |
| `/login`, `/signup` | Auth forms | public |
| `*` | 404 | public |

See `RUBRIC-GUIDE.md` for how every rubric item maps to the code.
