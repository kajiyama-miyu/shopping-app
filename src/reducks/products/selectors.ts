import { createSelector } from "reselect";
import { RootState } from "../store/rootReducer";

const productsSelector = (state: RootState) => state.products;

export const getItemState = createSelector(
  [productsSelector],
  (state) => state.items
);

export const getToppingState = createSelector(
  [productsSelector],
  (state) => state.toppings
);
