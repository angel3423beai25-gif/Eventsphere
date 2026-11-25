import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import EventFilters from '../components/EventFilters';
import EventCard from '../components/EventCard';
import Skeleton from '../components/Skeleton';
import { selectEvents, selectFiltered, selectFilters, selectStatus } from '../store/selectors';
import { loadMore, resetFilters, setCategory } from '../store/filtersSlice';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function Events() {
  useDocumentTitle('Events');
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const status = useSelector(selectStatus);
  const filtered = useSelector(selectFiltered);
  const total = useSelector(selectEvents).length;
  const { limit } = useSelector(selectFilters);

  // /events?category=Music pre-selects a category (query-string routing)
  useEffect(() => {
    const c = params.get('category');
    if (c) dispatch(setCategory(c));
  }, [params, dispatch]);

  const shown = filtered.slice(0, limit);
  return (
    <section>
      <div className="section-heading"><h1 className="page-title">Events</h1>
        <p>Filter by category, city or price, search by keyword, and sort the results.</p></div>
      <EventFilters />
      {status !== 'succeeded' ? <Skeleton /> : (
        <>
          <p className="results-meta" aria-live="polite">Showing {shown.length} of {filtered.length} matching events ({total} total)</p>
          {shown.length ? (
            <div className="events-grid">{shown.map((e) => <EventCard key={e.id} event={e} />)}</div>
          ) : (
            <div className="empty-state"><p>No events match your filters.</p>
              <button type="button" className="btn btn-ghost" onClick={() => dispatch(resetFilters())}>Clear filters</button></div>
          )}
          {filtered.length > shown.length && (
            <div className="center-row"><button type="button" className="btn btn-ghost" onClick={() => dispatch(loadMore())}>Load more events</button></div>
          )}
        </>
      )}
    </section>
  );
}
