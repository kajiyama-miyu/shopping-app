import * as Actions from "./actions";
import { initialLoadingState } from "../store/initialState";
import { Reducer } from "redux";
import { Loading } from "./type";

export const LoadingReducer: Reducer<Loading, Actions.Actions> = (
  state = initialLoadingState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.SHOW_LOADING:
      return { ...state, ...payload };
    case Actions.HIDE_LOADING:
      return { ...state, ...payload };
    default:
      return state;
  }
};
