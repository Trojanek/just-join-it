import axios from 'axios';

import {
  GET_OFFERS,
} from '../constants/actionTypes';
import endpoints from '../constants/endpoints';


const getOffers = () => ({
  type: GET_OFFERS,
  payload: axios.get(endpoints.offers),
});

export {
  getOffers,
};
