import { LoginUser } from "./type";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export const signInAction = (loginUser: LoginUser) => {
  return {
    type: SIGN_IN,
    payload: loginUser,
  };
};

export const signOutAction = () => {
  return {
    type: SIGN_OUT,
    payload: null,
  };
};

export type Action =
  | ReturnType<typeof signInAction>
  | ReturnType<typeof signOutAction>;
