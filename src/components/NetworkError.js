import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const NetworkError = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        color="error"
      >
        Network error.
      </Typography>
    </div>
  );
};

export default NetworkError;
