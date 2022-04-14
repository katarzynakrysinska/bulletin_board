import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getCartItems, addToCart, removeItem } from '../../../redux/cartRedux.js';
import styles from './Cart.module.scss';
// import { Link } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux.js';

const Component = ({ className, cartItems, removeItem}) => {

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cartItems.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0));
  }, [cartItems]);

  console.log(cartItems);

  return (
    <div className={clsx(className, styles.root)}>
      <div>
        {cartItems.length === 0 && <div>Cart Is Empty</div>}
      </div>
      <div className={clsx(className, styles.item)}>
        {cartItems.map((cartItem) => (
          <div key={cartItem.product} cartItem={cartItem} className={clsx(className, styles.content)} to={`/product/${cartItem._id}`}>
            <div className={styles.image}>
              <img src={cartItem.image1} alt={cartItem.name} />
            </div>
            <div className={clsx(className, styles.item)}>
              <h5>{cartItem.name}</h5>
              <div className={clsx(className, styles.actions)}>
                <button className={styles.button}>{cartItem.price} $</button>
              </div>
            </div>
            <Form.Control
              as="select"
              value={cartItems.qty}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
            <button
              type="button"
              variant="light"
              onClick={() => removeItem(cartItem.product)}>

              <AiFillDelete fontSize="20px" />
            </button>
          </div>
        )
        )}

      </div>
      <div>
        <span>Subtotal ({cartItems.length}) items</span>
      </div>
      <span>Total: $ {total} </span>
      
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  products: PropTypes.array,
  cartItems: PropTypes.array,
  product: PropTypes.object,
  match: PropTypes.object,
  addToCart: PropTypes.func,
  removeItem: PropTypes.func,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
  product: getProductById(state),
});

const mapDispatchToProps = dispatch => ({
  addToCart: arg => dispatch(addToCart(arg)),
  removeItem: (id) => dispatch(removeItem(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as ProductsList,
  Container as Cart,
  Component as CartComponent,
};