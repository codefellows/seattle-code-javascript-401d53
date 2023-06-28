import { createStyles } from '@mantine/core';

// maybe useful if the stykles are used by more than one component?
const useStyles = createStyles((theme) => ({
  h6: {
    backgroundColor: theme.colors.violet[1],
    padding: theme.spacing.lg,
    width: '75%',
    margin: 'auto',
    marginTop: theme.spacing.md,
  }
}));

export default useStyles;
