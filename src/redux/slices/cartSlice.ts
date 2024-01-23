import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type CartItem = {
  id: number,
  price: number,
  title: string,
  imageUrl: string,
  size: number,
  type: string,
  count: number,
}

interface CartState {
  totalPrice: number,
  totalCount: number,
  items: CartItem[],
}

const initialState: CartState = {
  totalPrice: JSON.parse(localStorage.getItem('price')!) || 0,
  totalCount: JSON.parse(localStorage.getItem('count')!) || 0,
  items: JSON.parse(localStorage.getItem('cart')!) || [],
}

const cartSlice = createSlice ({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else{
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price*item.count, 0)
      state.totalCount ++
    },

    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem!.count > 1){
        findItem!.count --
      } else {
        state.items = state.items.filter(obj => obj !== findItem)
      }
      state.totalCount --
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price*item.count, 0)
    },

    deleteItem(state, action) {
      state.items = state.items.filter(obj => obj.id !== action.payload.id)

      state.totalPrice = state.items.reduce((sum, item) => sum + item.price*item.count, 0)
      state.totalCount -= action.payload.count
    },

    clearItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = 0
    },
    },
  })


export const cartSelector = (state: RootState) => state.cart
export const cartItemSelector = (id: number) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const { addItem, deleteItem, clearItems, minusItem} = cartSlice.actions;

export default cartSlice.reducer;