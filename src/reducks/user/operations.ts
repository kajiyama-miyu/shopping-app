import axios from "axios";
import { showLoadingAction, hideLoadingAction } from "../loading/actions";
import { push } from "connected-react-router";
import { User, Login } from "./type";
import { signInAction } from "./actions";

export const signUp = (user: User) => {
  return async (dispatch: any) => {
    const {
      userName,
      email,
      password,
      confirmPassword,
      zipCode,
      address,
      telephone,
    } = user;

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度入力してください");
      return false;
    }

    return axios
      .post("url", {
        userName: userName,
        email: email,
        password: password,
        zipCode: zipCode,
        address: address,
        telephone: telephone,
      })
      .then(() => {
        dispatch(showLoadingAction("Sign up..."));
        dispatch(push("/signin"));
        dispatch(hideLoadingAction());
      })
      .catch((error) => {
        dispatch(hideLoadingAction());
        alert("アカウントの登録に失敗しました。もう一度登録し直してください。");
        throw new Error(error);
      });
  };
};

export const signIn = (loginUser: Login) => {
  return async (dispatch: any) => {
    const { email, password } = loginUser;

    return axios
      .post<string>("url", {
        email: email,
        password: password,
      })
      .then((res) => {
        dispatch(showLoadingAction("Sign in..."));

        if (!res.data) {
          dispatch(hideLoadingAction());
          alert("ユーザーが存在しません。ユーザー登録してください。");
          throw new Error("ユーザーが存在しません。");
        }

        dispatch(signInAction({ isSignedIn: true, loginTokrn: res.data }));

        dispatch(hideLoadingAction());
        dispatch(push("/itemlist"));
      })
      .catch(() => {
        dispatch(hideLoadingAction());
      });
  };
};
