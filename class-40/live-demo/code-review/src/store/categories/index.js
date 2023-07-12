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
try{
  let response = await axios.get('https://api-js401.herokuapp.com/api/v1/categories');
  dispatch(setInitialCategories(response.data.results));

} catch(e){
  console.log('this is the error from getCategories', e)
}

}

export const { setCategory, setInitialCategories } = categorySlice.actions;
export default categorySlice.reducer;
