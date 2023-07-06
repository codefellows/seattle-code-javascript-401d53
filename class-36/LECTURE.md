# Global Application State with Redux

## Vite

[Documentation](https://vitejs.dev/guide/)

## Redux impolementation

- Create a `store`
  - create at least one reducer with initial state.
  - create a store "hub" 1.e. an `index.js`
- in our store, we combine reducers
- we will use `createStore()` to provide our store for consumption

### Bring this into our React App

- import provider (in the root index.js) to establish React Context
- import connect method into our components (as needed) to consume redux

#### the OLDer way is to use this - I'll give an example, we won't use
- mapStateToProps and connect to consume state
- mapDispatchToProps and con ect to update state

## React Redux Hooks

### `useSelector()`

- how we get redux state
- leverage the useSelector() hook from react-redux to "hook" into the redux state object and destructure what we need

### `useDispatch()`

- how we dispatch actions to CHANGE state
- leverage the useDispatch() hook to create a dispatch method and update redux state as necessary

### initial state example for lab

if using one reducer, this works great!  You could also have a category and product reducer.  Today, totally your choice!

```js
let initialState = {
  categories: [
    { name: 'electronics', displayName: 'Electronics' },
    { name: 'food', displayName: 'Food' },
    { name: 'clothing', displayName: 'Clothing' },
  ],
  products: [
    { name: 'TV', category: 'electronics', price: 699.00, inStock: 5 },
    { name: 'Radio', category: 'electronics', price: 99.00, inStock: 15 },
    { name: 'Shirt', category: 'clothing', price: 9.00, inStock: 25 },
    { name: 'Socks', category: 'clothing', price: 12.00, inStock: 10 },
    { name: 'Apples', category: 'food', price: .99, inStock: 500 },
    { name: 'Eggs', category: 'food', price: 1.99, inStock: 12 },
    { name: 'Bread', category: 'food', price: 2.39, inStock: 90 },
  ],
  activeCategory: ''
};
```
