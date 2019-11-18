import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import OfferItem from './OfferItem';

const useStyles = makeStyles(({
  spacing,
}) => ({
  root: {
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
  },
  link: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    textDecoration: 'none',
  },
}));

const OfferListItem = ({
  data,
  index,
  style,
}) => {
  const classes = useStyles();
  const offer = data[index];

  return (
    <div
      style={style}
      className={classes.root}
    >
      <Link
        to={`/offer/${offer.id}`}
        className={classes.link}
      >
        <OfferItem offer={offer} />
      </Link>
    </div>
  );
};

OfferListItem.propTypes = {
  data: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default OfferListItem;
