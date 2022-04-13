/* selectors */
export const getCartItems = ({cart}) => cart.items;

/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');

/* action creators */
export const addToCart = payload => ({ payload, type: ADD_TO_CART });


/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...statePart,
        items: [...statePart.items, action.payload],
      };
    }
    
    default:
      return statePart;
  }
};