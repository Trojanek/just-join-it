import React, {
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { getOffers } from './state/offersActions';
import filters from './constants/filters';
import Home from './pages/Home';
import Offer from './pages/Offer';
import AppWrapper from './components/AppWrapper';

const homeSubpaths = filters
  .filter((item) => item.value)
  .map((item) => item.value)
  .join('|');

const AppContainer = ({
  dispatchGetOffers,
}) => {
  useEffect(() => {
    dispatchGetOffers();
  }, [dispatchGetOffers]);

  return (
    <Router>
      <AppWrapper>
        <Switch>
          <Route
            path="/offer/:id"
            component={Offer}
          />
          <Route
            path={`/:technology(${homeSubpaths})?`}
            component={Home}
          />
        </Switch>
      </AppWrapper>
    </Router>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGetOffers: () => dispatch(getOffers()),
});

AppContainer.propTypes = {
  dispatchGetOffers: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(AppContainer);
