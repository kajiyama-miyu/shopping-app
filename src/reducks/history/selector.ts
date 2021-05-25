import { createSelector } from "reselect";
import { RootState } from "../store/rootReducer";

const useSelector = (state: RootState) => state.ordered;

export const getOrderHistory = createSelector([useSelector], (state) => state);
