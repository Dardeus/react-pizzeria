import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  categoryIndex: 0,
  currentPage: 1,
  searchValue: "",
  activeSort: {name: 'популярности (+)', sortProperty: 'rating'},
}

const filterSlice = createSlice ({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryIndex(state, action) {
      state.categoryIndex = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setActiveSort(state, action) {
      state.activeSort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilterParams(state, action) {
      state.categoryIndex = Number(action.payload.categoryIndex);
      state.activeSort = action.payload.activeSort;
      state.currentPage = Number(action.payload.currentPage);
    },
  }
})

export const { setCategoryIndex, setActiveSort, setCurrentPage, setFilterParams, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;