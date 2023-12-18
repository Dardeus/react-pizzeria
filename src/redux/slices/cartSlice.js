import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
}

const cartSlice = createSlice ({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
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

    minusItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem.count > 1){
        findItem.count --
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

export const { addItem, deleteItem, clearItems, minusItem} = cartSlice.actions;

export default cartSlice.reducer;