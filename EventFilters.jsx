import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setCity, setPrice, setSearch, setSort } from '../store/filtersSlice';
import { selectCities, selectFilters } from '../store/selectors';
import { CATEGORIES } from '../utils/format';

export default function EventFilters() {
  const dispatch = useDispatch();
  const { search, category, price, city, sort } = useSelector(selectFilters);
  const cities = useSelector(selectCities);
  return (
    <div className="controls" role="search">
      <div className="controls-row">
        <input type="search" className="search-input" placeholder="Search events, places..."
          aria-label="Search events" value={search} onChange={(e) => dispatch(setSearch(e.target.value))} />
        <select aria-label="Filter by city" value={city} onChange={(e) => dispatch(setCity(e.target.value))}>
          <option value="All">All cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select aria-label="Filter by price" value={price} onChange={(e) => dispatch(setPrice(e.target.value))}>
          <option value="all">Any price</option><option value="free">Free</option><option value="paid">Paid</option>
        </select>
        <select aria-label="Sort events" value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
          <option value="date-asc">Soonest first</option>
          <option value="date-desc">Latest first</option>
          <option value="name-asc">Name A-Z</option>
          <option value="price-asc">Price: low to high</option>
        </select>
      </div>
      <div className="filter-chips" aria-label="Filter by category">
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} type="button" className={`chip${category === c ? ' active' : ''}`}
            aria-pressed={category === c} onClick={() => dispatch(setCategory(c))}>{c}</button>
        ))}
      </div>
    </div>
  );
}
