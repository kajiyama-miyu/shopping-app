import { type } from "node:os";

import { Loading } from "../loading/type";
import { LoginUser } from "../user/type";

export const initialLoadingState: Loading = {
  state: false,
  text: "",
};

export const initialUserState: LoginUser = {
  isSignedIn: false,
  loginTokrn: "",
};
