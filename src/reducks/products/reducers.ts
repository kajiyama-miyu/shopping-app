import { products } from "../store/initialState";
import * as Actions from "./actions";
import { Reducer } from "redux";
import { Products } from "./type";

export const ProductsReducers: Reducer<Products, Actions.Action> = (
  state = products,
  actions
): Products => {
  const { type, payload } = actions;

  switch (type) {
    case Actions.FETCH_ITEMS:
      return {
        ...state,
        items: payload,
      };
    case Actions.FETCH_TOPPINGS:
      return {
        ...state,
        toppings: payload,
      };
    default:
      return state;
  }
};
