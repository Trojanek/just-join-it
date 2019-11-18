import React, {
  forwardRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(({
  palette: {
    primary: {
      main: primaryMainColor,
    },
  },
}) => ({
  active: {
    color: primaryMainColor,
    '& span': {
      fontWeight: 700,
    },
  },
}));

const ListItemLink = ({
  primary,
  to,
}) => {
  const classes = useStyles();

  const renderLink = useMemo(
    () => forwardRef((itemProps, ref) => (
      <NavLink
        to={to}
        exact
        activeClassName={classes.active}
        innerRef={ref}
        {...itemProps}
      />
    )),
    [
      to,
      classes.active,
    ],
  );

  return (
    <li>
      <ListItem
        button
        component={renderLink}
      >
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

ListItemLink.propTypes = {
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ListItemLink;
