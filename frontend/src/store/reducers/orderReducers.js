import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_CLEAR
} from '../actions/actionConstants/orderConstants';

export const orderCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ORDER_CREATE_REQUEST: {
      return { loading: true };
    }
    case ORDER_CREATE_SUCCESS: {
      return { loading: false, success: true, order: payload };
    }
    case ORDER_CREATE_FAIL: {
      return { loading: false, error: payload };
    }
    case ORDER_CREATE_CLEAR: {
      return {};
    }
    default:
      return state;
  }
};
