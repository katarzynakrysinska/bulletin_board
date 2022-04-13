import Axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAllProducts = ({products}) => products.data;

export const getProductById = ({ products }, id) => {
  return products.data.filter((product) => product.id === id);
};

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const FETCH_PRODUCTS = createActionName('FETCH_PRODUCTS');
const FETCH_ONE_PRODUCT = createActionName('FETCH_ONE_PRODUCT');


/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const fetchProducts = payload => ({ payload, type: FETCH_PRODUCTS });
export const fetchOneProduct = payload => ({payload, type: FETCH_ONE_PRODUCT});

/* thunk creators */
export const fetchAllProducts = () => async (dispatch, getState) => {
  const {products} = getState();

  if (!products.data.length) {
    dispatch(fetchStarted());
    await Axios.get(`${API_URL}/products`)
      .then(res => {
        dispatch(fetchProducts(res.data));
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  }
};

export const fetchOneFromAPI = (_id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios.get(`${API_URL}/products/${_id}`)
      .then((res) => {
        dispatch(fetchOneProduct(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};


/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_ONE_PRODUCT: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        oneProduct: action.payload,
      };
    }
    
    default:
      return statePart;
  }
};
