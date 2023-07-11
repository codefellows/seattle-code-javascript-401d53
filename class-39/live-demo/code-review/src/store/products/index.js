import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [
  { name: 'TV', category: 'electronics', price: 699.00, inStock: 5 },
  { name: 'Radio', category: 'electronics', price: 99.00, inStock: 15 },
  { name: 'Shirt', category: 'clothing', price: 9.00, inStock: 25 },
  { name: 'Socks', category: 'clothing', price: 12.00, inStock: 10 },
  { name: 'Apples', category: 'food', price: .99, inStock: 500 },
  { name: 'Eggs', category: 'food', price: 1.99, inStock: 12 },
  { name: 'Bread', category: 'food', price: 2.39, inStock: 90 },
];

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => action.payload,
    // addProduct: (state, action) => state.map(product => product.name === action.payload.name ? {...product, inStock: product.inStock -1} : product),
    // removeProduct: (state, action) => state.map(product => product.name === action.payload.name ? {...product, inStock: product.inStock + 1} : product),
  }
});

export const getProducts = (activeCategory) => async (dispatch) => {
  console.log('this is the active category', activeCategory)
  let response = await axios.get(`https://api-js401.herokuapp.com/api/v1/products?category=${activeCategory}`);
  dispatch(setProducts(response.data.results));
}

export const incrementInventoryOnRemove = (product) => async (dispatch) => {
  product = {...product, inStock: product.inStock + 1};
  console.log('this is the product we are trying to remove', product);
  const res = await axios.put(`https://api-js401.herokuapp.com/api/v1/products/${product._id}`, product);
  console.log('was it removed?', res.data);

  dispatch(getProducts(product.category));

};

export const decrementInventoryOnAdd = (product) => async(dispatch) => {
  product = {...product, inStock: product.inStock - 1};
  await axios.put(`https://api-js401.herokuapp.com/api/v1/products/${product._id}`, product);

  dispatch(getProducts(product.category));

};

export const { addProduct, removeProduct, setProducts } = productSlice.actions
export default productSlice.reducer;
