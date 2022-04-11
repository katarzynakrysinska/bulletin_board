import Axios from 'axios';


/* selectors */


/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_ORDER = createActionName('FETCH_ORDER');




/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const fetchOrder = payload => ({ payload, type: FETCH_ORDER });




/* thunk creators */
export const addOrderInAPI = payload => {
  return (dispatch, getState) => {
    Axios
      .post(`http://localhost:8000/api/orders`, payload)
      .then(res => {
        dispatch(fetchOrder(res.data));
      })
      .catch(err => {
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
    case FETCH_ORDER: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    
    
    default:
      return statePart;
  }
};