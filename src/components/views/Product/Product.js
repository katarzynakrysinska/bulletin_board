import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchOneFromAPI } from '../../../redux/productsRedux.js';
import clsx from 'clsx';
//import { connect } from 'react-redux';
import styles from './Product.module.scss';


const Component = ({className}) => {

  const dispatch = useDispatch();
  const {id} = useParams();


  useEffect(() => {
    dispatch(fetchOneFromAPI(id));
  },[dispatch, id]);

  const product = useSelector((state) => state.products.oneProduct);

  if (product) {
    return (
      <div className="styles.root">
        <h1>Read more about the {product.name}</h1> 
        <div className={styles.item}> 
          <div className={clsx(className, styles.root)} fluid={'md'}>
            {product.text} {product.text} {product.text}
          </div>
          <div className={styles.image}>
            <img src={product.image2} alt="Example"></img>
          </div>
          <div className={styles.image}>
            <img src={product.image3} alt="Example"></img>
          </div>
          <div className={styles.actions}>
            <button className={styles.button}>
              Add { product.name} to cart
            </button>
          </div>
        </div>
        
      </div>
    );
  }
  else {
    return (
      <span>Loading...</span>
      
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  product: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    image1: PropTypes.string,
    price: PropTypes.number,
    text: PropTypes.string,
  }),
  fetchOneFromApi: PropTypes.func,
  match: PropTypes.object,

};


//const mapStateToProps = (state) => ({
//  product: getProductById(state),
//});

//const mapDispatchToProps = (dispatch, props) => ({
//  fetchOneFromApi: () => dispatch(fetchOneFromAPI(props.match.params.id)),
//});

//const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Product,
  // Container as Product,
  Component as ProductComponent,
};
