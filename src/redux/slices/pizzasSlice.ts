import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

type PizzaProps = {
  id: number,
  price: number,
  title: string,
  imageUrl: string,
  sizes: number[],
  types: number[],
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface PizzaState {
  items: PizzaProps[];
  status: Status
}

const initialState: PizzaState = {
  items: [],
  status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<PizzaProps[], string>(
  'pizzas/fetchPizzasStatus',
    async (url, thunkAPI) => {
    const { data } = await axios.get<PizzaProps[]>(url)

    if (data.length === 0) {
      thunkAPI.rejectWithValue("Нет пицц")
    }
    return data
  }
)

const pizzasSlice = createSlice ({
  name: 'pizzas',
  initialState,
  reducers: {
    setItem(state, action: PayloadAction<PizzaProps[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  }
})

export const { setItem } = pizzasSlice.actions;

export default pizzasSlice.reducer;