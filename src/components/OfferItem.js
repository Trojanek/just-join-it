import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({
  spacing,
}) => ({
  paper: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
  },
  imageContainer: {
    height: '100%',
    flex: '0 0 125px',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxWidth: 85,
    maxHeight: 40,
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
  },
  infoInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingRight: spacing(2),
  },
  salary: {
    textTransform: 'uppercase',
  },
}));

const OfferItem = ({
  offer,
}) => {
  const classes = useStyles();
  const skills = (offer.skills || [])
    .map((skill) => skill.name)
    .join(', ');

  return (
    <Paper className={classes.paper}>
      <div className={classes.imageContainer}>
        <img
          src={offer.company_logo_url}
          className={classes.image}
          alt={offer.title}
        />
      </div>
      <div className={classes.infoContainer}>
        <div className={classes.infoInnerContainer}>
          <div>
            <Typography variant="h6">
              {offer.title}
            </Typography>
            {
              Boolean(offer.city) && (
                <Typography variant="body2">
                  {`${offer.city}${offer.street ? `, ${offer.street}` : ''}`}
                </Typography>
              )
            }
          </div>
          <Typography
            variant="caption"
            color="textSecondary"
          >
            <Moment fromNow>
              {offer.published_at}
            </Moment>
          </Typography>
        </div>
        <div className={classes.infoInnerContainer}>
          <div>
            {
              (classes.salary && offer.salary_to)
                ? (
                  <Typography
                    variant="h6"
                    align="right"
                    color="primary"
                    className={classes.salary}
                  >
                    <NumberFormat
                      value={offer.salary_from}
                      displayType="text"
                      thousandSeparator=" "
                    />
                    <span> - </span>
                    <NumberFormat
                      value={offer.salary_to}
                      displayType="text"
                      thousandSeparator=" "
                    />
                    <span>
                      {` ${offer.salary_currency}`}
                    </span>
                  </Typography>
                )
                : (
                  <Typography
                    variant="h6"
                    align="right"
                    color="textSecondary"
                  >
                    Undisclosed salary
                  </Typography>
                )
            }
            {
              Boolean(offer.company_name) && (
                <Typography
                  variant="body2"
                  align="right"
                >
                  {offer.company_name}
                </Typography>
              )
            }
          </div>
          {
            Boolean(skills.length) && (
              <Typography
                variant="caption"
                align="right"
                color="textSecondary"
              >
                {skills}
              </Typography>
            )
          }
        </div>
      </div>
    </Paper>
  );
};

OfferItem.propTypes = {
  offer: PropTypes.object.isRequired,
};

export default OfferItem;
