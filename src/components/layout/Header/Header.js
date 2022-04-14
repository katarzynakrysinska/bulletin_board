import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Badge } from '@material-ui/core';
import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux.js';

import styles from './Header.module.scss';

const Component = ({className, children, cartItems}) => (

  <header className={clsx(className, styles.header)}>
    <NavLink to={'/'} className={styles.logo}>Land Breeze</NavLink>
    <nav>
      <ul>
        <li>
          <NavLink to={'/cart'}>Cart</NavLink>
          <Badge>{cartItems.length}</Badge>
        </li>
        <li>
          <NavLink to={'/cart'}>Contact Us</NavLink>
        </li>
        <li>
          <NavLink to={'/cart'}>Login</NavLink>
        </li>
      </ul>
    </nav>
    {children}
  </header>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cartItems: PropTypes.array,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
