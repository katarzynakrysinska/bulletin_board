import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';


// import { connect } from 'react-redux';
import { addOrderInAPI} from '../../../redux/orderRedux.js';

import styles from './Order.module.scss';



class Component extends React.Component {

  state = {
    order: {
      name: 'test Name',
      surname: 'Surname test',
      address: 'Test Street 5',
      email: 'test1@gmail.com',
      phone: '546856325',
    },
  };

  handleOrderFormData = event => {
    const order  = this.state;

    this.setState ({ order: { ...order, [event.target.name]: event.target.value },
    });
  };

  submitFormHandler = event => {
    event.preventDefault();
    const order  = this.state;
    const { addNewOrder } = this.props;


    addNewOrder(order);

    console.log(order);
  };

  render () {
    const { className } = this.props;
    const { order } = this.state;

    return (
      <div className={clsx(className, styles.root)}>
        <h2>Complete the following form to place an order:</h2>
            
        <form className={styles.form} onSubmit={this.submitFormHandler}>
          <div className={styles.control}>
            <label htmlFor="name">Name</label>
            <input type="text" required id="name" name='name' value={order.name} onChange={this.handleOrderFormData}/>
          </div>
          <div className={styles.control}>
            <label htmlFor="surname">Surname</label>
            <input type="text" required id="surname" name='surname' value={order.surname} onChange={this.handleOrderFormData}/>
          </div>
          <div className={styles.control}>
            <label htmlFor="address">Address</label>
            <input type="text" required id="address" name='address' value={order.address} onChange={this.handleOrderFormData}/>
          </div>
          <div className={styles.control}>
            <label htmlFor="email">Email</label>
            <input type="text" required id="email" name='email' value={order.email} onChange={this.handleOrderFormData}/>
          </div>
          <div className={styles.control}>
            <label htmlFor="phone">Phone</label>
            <input type="text" required id="phone" name='phone' value={order.phone} onChange={this.handleOrderFormData}/>
          </div>
          <div className={styles.actions}>
            <button>Send the order!</button>
          </div>
        </form>    
            
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  addNewOrder: PropTypes.func,
  submitFormHandler: PropTypes.func,
};

const mapStateToProps = state => ({
  //personalData: getPersonalData(state),
});

const mapDispatchToProps = dispatch => ({
  addNewOrder: (order) => dispatch(addOrderInAPI(order)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Order,
  Container as Order,
  Component as OrderComponent,
};
