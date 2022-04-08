import React from 'react';
import PropTypes from 'prop-types';
// import { Paper, Grid, Card, CardHeader } from '@material-ui/core';

//import clsx from 'clsx';
import styles from './Product.module.scss';


const Component = ({product}) => {
 
  console.log('product', product);

  return (
    <div>
      
      <div key={product._id} className={styles.component}>
        {product.name}
        
      </div>
      <img src={product.image1} alt="Example"></img>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  product: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    image1: PropTypes.string,
  }),
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Product,
  // Container as Product,
  //Component as ProductComponent,
};
