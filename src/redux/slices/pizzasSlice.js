import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: 'loading',
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (url) => {
    const { data } = await axios.get(url)
    return data
  }
)

const pizzasSlice = createSlice ({
  name: 'pizzas',
  initialState,
  reducers: {
    setItem(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading"
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = "success"
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error"
      state.items = []
    })
  }
})

export const { setItem } = pizzasSlice.actions;

export default pizzasSlice.reducer;