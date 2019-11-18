import React, {
  createRef,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { Helmet } from 'react-helmet';

import getDocumentTitle from '../utils/getDocumentTitle';
import {
  getIsPending,
  getHasError,
  getFilteredOffers,
  getTechnologyLabel,
} from '../selectors/offersSelectors';
import styleSettings from '../constants/styleSettings';
import Loading from '../components/Loading';
import NetworkError from '../components/NetworkError';
import OfferListItem from '../components/OfferListItem';

const {
  height: itemSize,
} = styleSettings.offerListItem;

const Home = ({
  isPending,
  hasError,
  filteredOffers,
  technologyLabel,
  match: {
    params: {
      technology,
    },
  },
}) => {
  const listRef = createRef();
  const documentTitle = getDocumentTitle(technologyLabel);
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
      default:
        return (
          <AutoSizer>
            {
              ({ height, width }) => (
                <List
                  itemData={filteredOffers}
                  itemCount={filteredOffers.length}
                  width={width}
                  height={height}
                  itemSize={itemSize}
                  ref={listRef}
                >
                  {OfferListItem}
                </List>
              )
            }
          </AutoSizer>
        );
    }
  })();

  useEffect(() => {
    if (listRef && listRef.current) {
      listRef.current.scrollTo(0);
    }
  }, [
    technology,
    listRef,
  ]);

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
  filteredOffers: getFilteredOffers(state, props),
  technologyLabel: getTechnologyLabel(state, props),
});

Home.propTypes = {
  isPending: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  filteredOffers: PropTypes.array.isRequired,
  technologyLabel: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
)(Home);
