import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import {getAllProducts, fetchAllProducts} from '../../../redux/productsRedux';
import { Product } from '../Product/Product';
import styles from './Homepage.module.scss';

const Component = ({ className, products, fetchAllProducts }) => {

  fetchAllProducts();

  return (
    <div className={clsx(className, styles.root)}>
      <h2>Homepage</h2>
      
      <div>
        {products.map(product => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
  
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array,
  product: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
  fetchAllProducts: PropTypes.func,
};

const mapStateToProps = state => ({
  products: getAllProducts(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchAllProducts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
