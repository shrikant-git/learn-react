import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  //Reducers has different actions(viz. addItem,removeItem,clearCart)
  reducers: {
    addItem: (state, action) => {
      //Mutating the state
      state.items.push(action.payload);
    },

    removeItem: (state) => {
      state.items.pop();
    },

    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

//Take out actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
