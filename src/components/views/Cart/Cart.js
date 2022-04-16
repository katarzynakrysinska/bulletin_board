import React, { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Image, FormControl} from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import PropTypes from 'prop-types';
//import clsx from 'clsx';
import { connect } from 'react-redux';
import { getCartItems, addToCart, removeItem} from '../../../redux/cartRedux.js';
import styles from './Cart.module.scss';
// import { Link } from 'react-router-dom';
import { getProductById } from '../../../redux/productsRedux.js';

const Component = ({ cartItems, removeItem, cartItem}) => {

  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cartItems.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0));
  }, [cartItems]);

  console.log(cartItems);

  

  return (
    <div className={styles.item}>
      <div className={styles.productContainer}>
        <ListGroup>
          {cartItems.map((cartItem) => (
            <ListGroup.Item key={cartItem.id}>
              <Row >
                <Col md={2}>
                  <Image src={cartItem.image1} alt={cartItem.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{cartItem.name}</span>
                </Col>
                <Col md={2}>
                  {cartItem.price}
                </Col>
                <Col md={2}>
                  <FormControl
                    as="select"
                    value={cartItem.qty} 
  
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </FormControl>
                </Col>
                <Col md={2}>
                  <button
                    type="button"
                    variant="light"
                    onClick={() => removeItem(cartItem.product)}>

                    <AiFillDelete fontSize="20px" />
                  </button>
                </Col>
              </Row>
            </ListGroup.Item>
          )
          )}
        </ListGroup>
      </div>
      <div className={styles.summary}>
        <span>Subtotal ({cartItems.length}) items</span>
        <span>Total: $ {total} </span>
      </div>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  products: PropTypes.array,
  cartItems: PropTypes.array,
  product: PropTypes.array,
  match: PropTypes.object,
  addToCart: PropTypes.func,
  removeItem: PropTypes.func,
  changeCartQty: PropTypes.func,
  id: PropTypes.string,
  qty: PropTypes.number,
  cartItem: PropTypes.object,
};

const mapStateToProps = state => ({
  cartItems: getCartItems(state),
  product: getProductById(state),
});

const mapDispatchToProps = dispatch => ({
  addToCart: (id) => dispatch(addToCart(id)), 
  removeItem: (id) => dispatch(removeItem(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as ProductsList,
  Container as Cart,
  Component as CartComponent,
};