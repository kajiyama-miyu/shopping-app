import * as Actions from "./actions";
import { user } from "../store/initialState";
import { Reducer } from "redux";
import { Order } from "./type";

export const UserReducer: Reducer<Order, Actions.Action> = (
  state = user,
  action
): Order => {
  const { type, payload } = action;

  switch (type) {
    case Actions.FETCH_CART:
      return {
        ...state,
        ...payload,
      };
    case Actions.FETCH_ORDER_HISTORY:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
