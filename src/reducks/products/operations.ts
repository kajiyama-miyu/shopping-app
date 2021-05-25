import axios from "axios";
import { Items, Toppings, OrderProducts } from "./type";
import { fetchProductsAction, fetchToppingsAction } from "./actions";
import { showLoadingAction, hideLoadingAction } from "../loading/actions";
import { push } from "connected-react-router";

export const fetchItems = () => {
  return async (dispatch: any) => {
    return axios
      .get<Array<Items>>("http://35.73.116.71/api/item/")
      .then((res) => {
        dispatch(fetchProductsAction(res.data));
      });
  };
};

export const fetchToppings = () => {
  return async (dispatch: any) => {
    return axios
      .get<Array<Toppings>>("http://35.73.116.71/api/topping/")
      .then((res) => {
        dispatch(fetchToppingsAction(res.data));
      });
  };
};

export const orderProducts = (order: OrderProducts) => {
  return async (dispatch: any) => {
    dispatch(showLoadingAction("注文処理中です..."));
    const {
      status,
      total_price,
      destination_name,
      destination_email,
      destination_zipcode,
      destination_address,
      destination_tel,
      order_date,
      delivery_time,
      payment_method,
    } = order;

    return await axios
      .post(
        "http://35.73.116.71/api/order/",
        {
          status: status,
          total_price: total_price,
          destination_name: destination_name,
          destination_email: destination_email,
          destination_zipcode: destination_zipcode,
          destination_address: destination_address,
          destination_tel: destination_tel,
          order_date: order_date,
          delivery_time: delivery_time,
          payment_method: payment_method,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        console.log("注文成功");
        dispatch(push("/orderFinish"));
        dispatch(hideLoadingAction());
      })
      .catch((error) => {
        dispatch(hideLoadingAction());
        alert("注文に失敗しました。もう一度注文し直してください。");
        throw new Error(error);
      });
  };
};
