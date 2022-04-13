import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCartItems } from '../../../redux/cartRedux.js';

import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';



const Component = ({ className, cartItems }) => {

  const [ subtotalPrice, setSubtotalPrice ] = useState(0);

  useEffect(() => {
    let price = 0;
    cartItems.forEach(item => {
      price += parseInt(item.price);
    });
    setSubtotalPrice(price);
  }, [cartItems]);

  let deliveryFee = 12;

  if (subtotalPrice > 99) {
    deliveryFee = 0;
  }

  let totalPrice = subtotalPrice + deliveryFee;

  
  return (
    <div className={clsx(className, styles.cart_view)}>
      <div className={clsx(className, styles.product_card_container)}>
        {cartItems.map((cartItem) => (
          <Link key={cartItem._id} className={clsx(className, styles.product_card)} to={`/product/${cartItem._id}`}>
            <img src={cartItem.image} alt={cartItem.name} />
            <div className={clsx(className, styles.product_card_content)}>
              <h5>{cartItem.name}</h5>
              <div className={clsx(className, styles.product_card_content_buttons)}>
                <button>{cartItem.price} $</button>
              </div>
            </div>
          </Link>
        )
        )}
      </div>
      <div className={clsx(className, styles.cart_prices)}>
        {cartItems.length ? (
          <div><h2>Products price: {subtotalPrice} $</h2>
            <h2>Delivery: {deliveryFee} $</h2>
            <h2>Products + delivery price: {totalPrice} $</h2>
            <Link to='/order'><button className={clsx(className, styles.make_order)}>Make order</button></Link>
          </div>) : (<div></div>)}
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  products: PropTypes.array,
  cartItems: PropTypes.array,
  fetchAllProducts: PropTypes.func,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  //Component as ProductsList,
  Container as Cart,
  Component as CartComponent,
};