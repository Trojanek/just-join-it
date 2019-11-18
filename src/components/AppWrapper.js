import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';

import filters from '../constants/filters';
import styleSettings from '../constants/styleSettings';
import ListItemLink from './ListItemLink';

const {
  width: drawerWidth,
} = styleSettings.drawer;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    display: 'flex',
    flexGrow: 1,
    height: '100vh',
  },
  container: {
    flex: 'auto',
    padding: 0,
  },
}));

const AppWrapper = ({
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List component="nav">
          {
            filters.map((filter) => (
              <ListItemLink
                key={filter.value}
                to={`/${filter.value}`}
                primary={filter.label}
              />
            ))
          }
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container
          maxWidth={false}
          className={classes.container}
        >
          {children}
        </Container>
      </main>
    </div>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
