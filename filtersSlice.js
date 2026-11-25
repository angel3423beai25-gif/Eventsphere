import { createSlice } from '@reduxjs/toolkit';

export const PAGE_SIZE = 6;
const initialState = { search: '', category: 'All', price: 'all', city: 'All', sort: 'date-asc', limit: PAGE_SIZE };

// Any filter change resets the "load more" counter back to one page.
const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (s, a) => { s.search = a.payload; s.limit = PAGE_SIZE; },
    setCategory: (s, a) => { s.category = a.payload; s.limit = PAGE_SIZE; },
    setPrice: (s, a) => { s.price = a.payload; s.limit = PAGE_SIZE; },
    setCity: (s, a) => { s.city = a.payload; s.limit = PAGE_SIZE; },
    setSort: (s, a) => { s.sort = a.payload; },
    loadMore: (s) => { s.limit += PAGE_SIZE; },
    resetFilters: () => initialState
  }
});

export const { setSearch, setCategory, setPrice, setCity, setSort, loadMore, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
