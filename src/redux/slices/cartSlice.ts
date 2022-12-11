import { RootState } from './../store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type TItems = {
  id: string;
  size: number;
  type: string;
  title: string;
  price: number;
  count: number;
  imageUrl: string;
}


interface ICartSliceState {
  items: TItems[];
  totalPrice: number;
}

const initialState: ICartSliceState = {
  items: [],
  totalPrice: 0,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, { payload }: PayloadAction<TItems>) {
      const findItem = state.items.find(
        (obj) => obj.id === payload.id && obj.type === payload.type && obj.size === payload.size,
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    minusItem(state, { payload }: PayloadAction<TItems>) {
      const findItem = state.items.find(
        (obj) => obj.id === payload.id && obj.size === payload.size && obj.type === payload.type,
      );

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeCartItem(state, { payload }: PayloadAction<TItems>) {
      const findItem = state.items.find((obj) => {
        return obj.id === payload.id && obj.size === payload.size && obj.type === payload.type;
      });

      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count;
      }

      state.items = state.items.filter((obj) => {
        return obj.id !== payload.id || obj.size !== payload.size || obj.type !== payload.type;
      });
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});
export const cartSelector = (state: RootState) => state.cart
export const cartSelectorById = (id: string) => (state: RootState) => state.cart.items.filter(obj => obj.id === id)
export const { addCartItem, removeCartItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
