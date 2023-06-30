// import { Header } from '@mantine/core';


// function HeaderComponent(){

// // here is an example of using the Header Mantine Component
//   return (
//     <Header height={60} p="xs">
//       This is some text
//     </Header>
//   )
// }

// export default HeaderComponent;

import { createStyles, Group, Navbar } from '@mantine/core';
import { Link } from "react-router-dom";
import Login from '../Login';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: '100%',
    padding: theme.spacing.md,
  },
  link: {
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
    textDecoration: 'none',
  }
}));

function Header() {
  const { classes } = useStyles();

  return (
    <header>
      <Navbar className={classes.navbar}>
        <Group position="apart">
          <Group>
            <Link to="/" className={classes.link}>Home</Link>
            <Link to="/settings" className={classes.link}>Settings</Link>
          </Group>
          <Login />
        </Group>
      </Navbar>
    </header>
  )
}

export default Header;
