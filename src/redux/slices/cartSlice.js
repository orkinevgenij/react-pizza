import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, { payload }) {
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

    minusItem(state, { payload }) {
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
    removeCartItem(state, { payload }) {
      const findItem = state.items.find((obj) => {
        return obj.id === payload.id && obj.size === payload.size && obj.type === payload.type;
      });

      state.totalPrice -= findItem.price * findItem.count;

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
export const cartSelector = (state) => state.cart
export const cartSelectorById = (id) => (state) => state.cart.items.filter(obj => obj.id === id)
export const { addCartItem, removeCartItem, clearItems, minusItem, plusItem } = cartSlice.actions;
export default cartSlice.reducer;
