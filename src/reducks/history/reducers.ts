import * as Actions from "./actions";
import { history } from "../store/initialState";
import { Reducer } from "redux";
import { Order } from "../user/type";

export const OrderHistoryReducer: Reducer<Array<Order>, Actions.Action> = (
  state = history,
  action
): Array<Order> => {
  const { type, payload } = action;

  switch (type) {
    case Actions.FETCH_ORDER_HISTORY:
      return (state = payload);
    default:
      return state;
  }
};
