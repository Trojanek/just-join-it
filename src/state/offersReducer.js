import typeToReducer from 'type-to-reducer';

import {
  GET_OFFERS,
} from '../constants/actionTypes';
import offersInitialState from './offersInitialState';

const offersReducer = typeToReducer({
  [GET_OFFERS]: {
    PENDING: (state) => ({
      ...state,
      isPending: true,
    }),
    FULFILLED: (state, {
      payload: {
        data,
      },
    }) => ({
      ...state,
      isPending: false,
      items: data,
    }),
    REJECTED: (state) => ({
      ...state,
      isPending: false,
      hasError: true,
    }),
  },
}, offersInitialState);

export default offersReducer;
