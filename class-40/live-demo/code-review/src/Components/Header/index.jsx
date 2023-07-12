import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.scss';

function Header() {
  const cart = useSelector(state => state.cart);
  return (
    <>
      <AppBar>
        <Toolbar className="toolBar">
          <Grid container>
            <Grid item>
              <Button component={Link} to="/">
                <Typography className="header-font-color" variant="h4">Our Store</Typography>
              </Button>
            </Grid>
            <Grid item xs style={{ textAlign: 'right', alignSelf: 'center' }}>
              <Button component={Link} to="/cart">
                <Typography className="header-font-color">CART ({cart.length})</Typography>
              </Button>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
