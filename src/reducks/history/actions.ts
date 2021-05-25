import { Order } from "../user/type";

export const FETCH_ORDER_HISTORY = "FETCH_ORDER_HISTORY";

export const fetchOrderHistory = (history: Array<Order>) => {
  return {
    type: FETCH_ORDER_HISTORY,
    payload: history,
  };
};

export type Action = ReturnType<typeof fetchOrderHistory>;
