import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  categoryIndex: 0,
  currentPage: 1,
  activeSort: {name: 'популярности (+)', sortProperty: 'rating'},
}

const filterSlice = createSlice ({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    }
  }
})

export const { setCategoryIndex, setActiveSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;