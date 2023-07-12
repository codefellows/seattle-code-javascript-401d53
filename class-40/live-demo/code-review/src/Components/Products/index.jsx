import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { When } from 'react-if';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { addToCart } from '../../store/cart';
import { decrementInventoryOnAdd, getProducts } from '../../store/products';

function Products() {
  const activeCategory = useSelector((state) => state.categories.activeCategory);
  const products = useSelector((state) => state.products);
  console.log('this is products.....', products)
  const dispatch = useDispatch();

  const addDispatcher = (product) => {
    dispatch(addToCart(product));
    dispatch(decrementInventoryOnAdd(product));
  };

  useEffect(() => {
    dispatch(getProducts(activeCategory.name))
  }, [activeCategory]);

  return (
    <>
      <When condition={activeCategory}>
        <h2>{activeCategory.displayName}</h2>
        <h4>Category Description Goes Here</h4>
        <Grid container spacing={2} width="80%" margin="auto">
          {
            products.map((product, index) => (
              <Grid key={`products${index}`} item xs={12} md={6} lg={4} >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={`https://source.unsplash.com/random?${product.name}`}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>

                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => addDispatcher(product)}
                      size="small"
                    >
                      ADD TO CART
                    </Button>
                    <Button
                      component={Link}
                      to={`/productDetails/${product._id}`}
                      size="small"
                    >
                      VIEW DETAILS
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </When>
    </>
  )
}

export default Products
