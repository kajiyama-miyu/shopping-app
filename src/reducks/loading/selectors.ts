import { createSelector } from "reselect";
import { Loading } from "./type";

const loadingSelector = (state: Loading) => state;

export const getLoadingState = createSelector(
  [loadingSelector],
  (state) => state.state
);

export const getLoadingText = createSelector(
  [loadingSelector],
  (state) => state.text
);
