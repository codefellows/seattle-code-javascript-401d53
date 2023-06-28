import { useContext } from 'react';
import { ModeContext } from '../../Context/Mode';
import { Button, createStyles } from '@mantine/core';
// another option
// import useStyles from '../../hooks/styles';

const useStyles = createStyles((theme) => ({
  h6: {
    backgroundColor: theme.colors.violet[1],
    padding: theme.spacing.lg,
    width: '75%',
    margin: 'auto',
    marginTop: theme.spacing.md,
  }
}));

function Main(){
  const { mode } = useContext(ModeContext);
  const { classes } = useStyles();

  return(
    <>
      <Button color="violet" radius="xl" uppercase>
        Click Me I Do Nothing
      </Button>
      <h6 className={classes.h6}>light/dark mode from Mode Context:  {mode}</h6>
    </>
  )
}

export default Main;
