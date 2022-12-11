import { RootState } from './../store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title'
}

export type TSort = {
  name: string,
  sortProperty: SortPropertyEnum;
}
interface IFilterSliceState {
  searchValue: string;
  orderType: string;
  categoryId: number;
  currentPage: number;
  sort: TSort;
}

const initialState: IFilterSliceState = {
  searchValue: '',
  orderType: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'По популярности',
    sortProperty: SortPropertyEnum.RATING,
  },
};
const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, { payload }: PayloadAction<number>) {
      state.categoryId = payload;
    },
    setSortType(state, { payload }: PayloadAction<TSort>) {
      state.sort = payload;
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
    setSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload
    },
    setOrderType(state, { payload }: PayloadAction<string>) {
      state.orderType = payload;
    }

  },
});

export const filterSelector = (state: RootState) => state.filter
export const sortSelector = (state: RootState) => state.filter.sort
export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setOrderType } = filterSlice.actions;
export default filterSlice.reducer;
