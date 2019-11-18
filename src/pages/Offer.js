import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import getDocumentTitle from '../utils/getDocumentTitle';
import {
  getIsPending,
  getHasError,
  getSingleOffer,
} from '../selectors/offersSelectors';
import styleSettings from '../constants/styleSettings';
import Loading from '../components/Loading';
import NetworkError from '../components/NetworkError';
import OfferItem from '../components/OfferItem';

const {
  offerListItem: {
    height: offerHeight,
  },
  map: {
    zoom,
  },
} = styleSettings;

const useStyles = makeStyles(({
  spacing,
}) => ({
  root: {
    padding: spacing(2),
  },
  offer: {
    height: offerHeight,
  },
  notFound: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    paddingTop: spacing(3),
  },
}));

const Offer = ({
  isPending,
  hasError,
  singleOffer,
}) => {
  const classes = useStyles();
  const hasSingleOffer = Boolean(Object.keys(singleOffer).length);
  const documentTitle = getDocumentTitle(singleOffer.title);
  const position = Boolean(singleOffer.latitude && singleOffer.longitude) && [
    singleOffer.latitude,
    singleOffer.longitude,
  ];
  const content = (() => {
    switch (true) {
      case isPending:
        return (
          <Loading />
        );
      case hasError:
        return (
          <NetworkError />
        );
      case !hasSingleOffer:
        return (
          <div className={classes.notFound}>
            <Typography
              variant="h5"
              color="error"
            >
              {'Sorry, we couldn\'t find this offer.'}
            </Typography>
          </div>
        );
      default:
        return (
          <div className={classes.root}>
            <div className={classes.offer}>
              <OfferItem offer={singleOffer} />
            </div>
            {
              Boolean(zoom) && (
                <div className={classes.mapContainer}>
                  <Map
                    center={position}
                    zoom={zoom}
                  >
                    <TileLayer
                      attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                      url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                      <Popup>
                        {singleOffer.title}
                      </Popup>
                    </Marker>
                  </Map>
                </div>
              )
            }
          </div>
        );
    }
  })();

  return (
    <>
      <Helmet>
        <title>
          {documentTitle}
        </title>
      </Helmet>
      {content}
    </>
  );
};

const mapStateToProps = (state, props) => ({
  isPending: getIsPending(state),
  hasError: getHasError(state),
  singleOffer: getSingleOffer(state, props),
});

Offer.defaultProps = {
  singleOffer: {},
};

Offer.propTypes = {
  isPending: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  singleOffer: PropTypes.object,
};

export default connect(
  mapStateToProps,
)(Offer);
