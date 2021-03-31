import { Order } from "./type";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const FETCH_USER_INFO = "FETCH_USER_INFO";
export const FETCH_ORDER_ITEM = "FETCH_ORDER_ITEM";
export const FETCH_CART = "FETCH_CART";
export const FETCH_ORDER_HISTORY = "FETCH_ORDER_HISTORY";

export const signOutAction = () => {
  return {
    type: SIGN_OUT,
    payload: null,
  };
};

export const fetchCartAction = (cart: Order) => {
  return {
    type: FETCH_CART,
    payload: cart,
  };
};

export type Action = ReturnType<typeof fetchCartAction>;
