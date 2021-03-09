import * as Actions from "./actions";
import { initialLoadingState } from "../store/initialState";

export const LoadingReducer = (
  state = initialLoadingState,
  action: Actions.Actions
) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.SHOW_LOADING:
      return { ...state, payload };
    case Actions.HIDE_LOADING:
      return { ...state, payload };
    default:
      return state;
  }
};
