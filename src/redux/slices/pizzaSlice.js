import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { sort, orderType, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://6372628e025414c6370e5f88.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${orderType}${search}`,
  );
  return data;
});
const initialState = {
  items: [],
  status: 'loading', //loading || succes || error
};
const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, { payload }) {
      // state.items = payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, { payload }) => {
      state.items = payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});
export const pizzaSelector = (state) => state.pizza.items
export const pizzaSelectorData = (state) => state.pizza
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
