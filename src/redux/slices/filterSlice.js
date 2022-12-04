import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'По популярности',
    sortProperty: 'rating',
  },
};
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, { payload }) {
      state.searchValue = payload
    }
  },
});

export const filterSelector = (state) => state.filter
export const sortSelector = (state) => state.filter.sort
export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
