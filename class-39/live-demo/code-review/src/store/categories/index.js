import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    activeCategory: ''
  },
  reducers: {
    setCategory: (state, action) => {
    return {...state, activeCategory: action.payload}
    },
    setInitialCategories: (state, action) => {
      state.categories = action.payload;
    }
  }

});

export const getCategories = () => async (dispatch, getState) => {
// make our call to get categories from the database
let response = await axios.get('https://api-js401.herokuapp.com/api/v1/categories');
dispatch(setInitialCategories(response.data.results));

}

export const { setCategory, setInitialCategories } = categorySlice.actions;
export default categorySlice.reducer;
