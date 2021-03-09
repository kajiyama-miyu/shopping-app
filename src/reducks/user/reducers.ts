import * as Actions from "./actions";
import { initialUserState } from "../store/initialState";

export const UserReducer = (
  state = initialUserState,
  action: Actions.Action
) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.SIGN_IN:
      return { ...state, payload };
    case Actions.SIGN_OUT:
      return { ...state, payload };
    default:
      return state;
  }
};
