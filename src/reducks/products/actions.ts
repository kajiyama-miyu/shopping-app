import { Items, Toppings } from "./type";

export const FETCH_ITEMS = "FETCH_ITEMS";
export const FETCH_TOPPINGS = "FETCH_TOPPINGS";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProductsAction = (items: Array<Items>) => {
  return {
    type: FETCH_ITEMS,
    payload: items,
  };
};

export const fetchToppingsAction = (toppings: Array<Toppings>) => {
  return {
    type: FETCH_TOPPINGS,
    payload: toppings,
  };
};

export type Action =
  | ReturnType<typeof fetchProductsAction>
  | ReturnType<typeof fetchToppingsAction>;
