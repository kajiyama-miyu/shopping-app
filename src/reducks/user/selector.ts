import { createSelector } from "reselect";
import { RootState } from "../store/rootReducer";

const useSelector = (state: RootState) => state.user;

//カート内容を取得
export const getOrderItem = createSelector(
  [useSelector],
  (state) => state.order_items
);

export const getCartItem = createSelector([useSelector], (state) => state);
