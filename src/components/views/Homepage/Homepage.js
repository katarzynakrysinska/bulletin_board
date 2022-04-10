import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {getAllProducts, fetchAllProducts} from '../../../redux/productsRedux';
import styles from './Homepage.module.scss';

const Component = ({ className, products, fetchAllProducts }) => {

  fetchAllProducts();

  return (
    <div className={clsx(className, styles.root)}>
      <h2>See our products!</h2>
      
      <div>
        {products.map(product => (
          <div key={product._id} product={product}>

            <div className={styles.item}>
              <div className={styles.image}>
                <img src={product.image1} alt="Example"></img>
              </div>
                
              <div key={product._id} className={styles.content}>
                <h3>{product.name}</h3>
                <div>from {product.price} $</div>
                <div className={styles.actions}>
                  <button className={styles.button}>
                    <Link 
                      to={`/product/${product._id}`}
                    >
                      View details
                    </Link>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
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
