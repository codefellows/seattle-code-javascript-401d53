import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { addToCart } from '../../store/cart';

function ProductDetails() {
  const products = useSelector(state => state.products)
  const { id } = useParams();
  const selectedProduct = products.find(product => product._id === id);
  console.log('this is my selected product', selectedProduct);

  const addDispatcher = (product) => {
    dispatch(addToCart(product));
    dispatch(decrementInventoryOnAdd(product));
  };

  return (
    <div style={{ margin: "auto", marginTop: '75px' }}>
      <Card sx={{ maxWidth: '80%' }} >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center">
            {selectedProduct.name}
          </Typography>

        </CardContent>
        <CardMedia
          sx={{ height: 200 }}
          image={`https://source.unsplash.com/random?${selectedProduct.name}`}
          title={selectedProduct.name}
        />
        <CardActions>
          <Button
            onClick={() => addDispatcher(selectedProduct)}
            size="small"
          >
            ADD TO CART
          </Button>

        </CardActions>
      </Card>
    </div>
  )
}

export default ProductDetails;
