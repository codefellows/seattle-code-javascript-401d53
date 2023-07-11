import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header(){
  return (
  <>
    <Button component={Link} to="/">Home</Button>
    <h1 data-testid="header-h1">Hello World</h1>
  </>
  )
}

export default Header;
