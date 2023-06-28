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

import { createStyles, Navbar, Text } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: '100%',
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
    padding: theme.spacing.md,
  }
}));

function Header(){
  const { classes } = useStyles();

  return (
    <header>
      <Navbar className={classes.navbar}>
        <Text>Home</Text>
      </Navbar>
    </header>
  )
}

export default Header;
