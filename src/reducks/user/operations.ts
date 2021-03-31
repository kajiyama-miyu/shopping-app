import axios from "axios";
import { showLoadingAction, hideLoadingAction } from "../loading/actions";
import { push } from "connected-react-router";
import { User, Login, AddCart, Order } from "./type";
import { fetchCartAction } from "./actions";

export const signUp = (user: User) => {
  return async (dispatch: any) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      zipcode,
      address,
      telephone,
    } = user;

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度入力してください");
      return false;
    }

    return axios
      .post("http://35.73.116.71/api/register/", {
        name: name,
        email: email,
        password: password,
        zipcode: zipcode,
        address: address,
        telephone: telephone,
      })
      .then(() => {
        dispatch(showLoadingAction("Sign up..."));
        dispatch(push("/"));
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
    dispatch(showLoadingAction("Sign in..."));

    return await axios
      .post<string>("http://35.73.116.71/api/auth/login/", {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data;
        const arr = Object.values(token);
        const tokenSt = arr[0];

        if (!res.data) {
          dispatch(hideLoadingAction());
          alert("ユーザーが存在しません。ユーザー登録してください。");
          throw new Error("ユーザーが存在しません。");
        }
        //ローカルストレージにトークンを保存
        localStorage.setItem("token", tokenSt);

        dispatch(hideLoadingAction());
        dispatch(push("/showList"));
      })
      .catch(() => {
        alert("メールアドレスまたはパスワードが間違っています");
        dispatch(hideLoadingAction());
      });
  };
};

export const signOut = (authorization: string) => {
  return async (dispatch: any) => {
    return await axios
      .post("http://35.73.116.71/api/auth/logout/", {
        headers: {
          Authorization: authorization,
        },
      })
      .then(() => {
        localStorage.clear();

        dispatch(push("/"));
      });
  };
};

export const addProductsCart = (orderItem: AddCart) => {
  return async (dispatch: any) => {
    const {
      order_item: { item, order_toppings, size, quantity },
      status,
    } = orderItem;

    return axios
      .post(
        "http://35.73.116.71/api/add_cart/",
        {
          order_item: {
            item: item,
            size: size,
            quantity: quantity,
            order_toppings: order_toppings,
          },
          status: status,
        },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(() => {
        dispatch(push("/cart"));
      })
      .catch((error) => {
        alert("カート追加に失敗しました。もう一度追加してください。");
        throw new Error(error);
      });
  };
};

export const showCart = () => {
  return async (dispatch: any) => {
    return await axios
      .get<Order>("http://35.73.116.71/api/add_cart/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(fetchCartAction(res.data));
      });
  };
};
