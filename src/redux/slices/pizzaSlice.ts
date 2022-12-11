import { RootState } from './../store/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TSort } from './filterSlice';

type TFetchPizzasArgs = {
  sort: TSort;
  orderType: string;
  category: string;
  search: string;
  currentPage: number;
}


type TPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[],
  types: number[];
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IPizzaSliceState {
  items: TPizza[];
  status: Status;
}

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING //loading || succes || error
};

export const fetchPizzas = createAsyncThunk<TPizza[], TFetchPizzasArgs>('pizza/fetchPizzasStatus', async (params) => {
  const { sort, orderType, category, search, currentPage } = params;
  const { data } = await axios.get<TPizza[]>(
    `https://6372628e025414c6370e5f88.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=${orderType}${search}`
  );
  return data;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, { payload }) {
      state.items = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })

    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = [];
    })
  }
}

);
export const pizzaSelector = (state: RootState) => state.pizza.items
export const pizzaSelectorData = (state: RootState) => state.pizza
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
