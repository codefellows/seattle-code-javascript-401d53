import { useSelector } from 'react-redux';
import { When } from 'react-if';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function Products() {
  const { activeCategory, products } = useSelector((state) => state.store)
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
                    <Button size="small">ADD TO CART</Button>
                    <Button size="small">VIEW DETAILS</Button>
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
