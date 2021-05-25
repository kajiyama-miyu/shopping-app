import { fetchOrderHistory } from "./actions";
import axios from "axios";
import { Order } from "../user/type";

export const showOrderHistory = () => {
  return async (dispatch: any) => {
    return await axios
      .get<Array<Order>>("http://35.73.116.71/api/history/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(fetchOrderHistory(res.data));
      });
  };
};
