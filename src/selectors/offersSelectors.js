import { createSelector } from 'reselect';
import filters from '../constants/filters';

const getOffers = (state) => state.offersReducer.items;
const getTechnology = (state, props) => props.match.params.technology;
const getId = (state, props) => props.match.params.id;

export const getIsPending = (state) => state.offersReducer.isPending;

export const getHasError = (state) => state.offersReducer.hasError;

export const getFilteredOffers = createSelector(
  [
    getOffers,
    getTechnology,
  ],
  (
    offers,
    technology,
  ) => offers.filter((offer) => (
    !technology || (technology === offer.marker_icon)
  )),
);

export const getSingleOffer = createSelector(
  [
    getOffers,
    getId,
  ],
  (
    offers,
    id,
  ) => offers.find((offer) => (
    id === offer.id
  )),
);

export const getTechnologyLabel = createSelector(
  [
    getTechnology,
  ],
  (
    technology,
  ) => (
    (filters.find((filter) => technology === filter.value) || {}).label || ''
  ),
);
