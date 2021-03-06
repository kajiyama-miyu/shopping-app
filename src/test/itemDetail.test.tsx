import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { history, store } from "../reducks/store/rootReducer";
import { ProductsReducers } from "../reducks/products/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { ItemDetailForTest } from "../templates/index";
import axios from "axios";
import { Order } from "../reducks/user/type";

afterEach(() => {
  cleanup();
});

describe("Render itemDetail and toppings from API", () => {
  let store: any;
  beforeEach(() => {
    store = createStore(
      combineReducers({ products: ProductsReducers }),
      applyMiddleware(routerMiddleware(history), thunk)
    );
  });
  it("Should display itemdetail and radio of price and checkbox of toppings", async () => {
    render(
      <Provider store={store}>
        <ItemDetailForTest />
      </Provider>
    );
    expect(await screen.findByText("Gorgeous4サンド")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")[0]).toBeTruthy();
    expect(screen.getAllByRole("radio")[1]).toBeTruthy();
    expect(await screen.findByText("M 480円")).toBeInTheDocument();
    expect(await screen.findByText("L 700円")).toBeInTheDocument();
    expect(screen.getAllByRole("group")).toBeTruthy();
    expect(await screen.findByText("コーヒークリーム")).toBeInTheDocument();
    expect(await screen.findByText("低脂肪牛乳")).toBeInTheDocument();
    expect(await screen.findByText("無脂肪牛乳")).toBeInTheDocument();
    expect(await screen.findByText("豆乳")).toBeInTheDocument();
    expect(await screen.findByText("オールミルク")).toBeInTheDocument();
    expect(await screen.findByText("キャラメルソース")).toBeInTheDocument();
    expect(await screen.findByText("チョコソース")).toBeInTheDocument();
    expect(await screen.findByText("チョコチップ")).toBeInTheDocument();
    expect(await screen.findByText("蜂蜜")).toBeInTheDocument();
    expect(await screen.findByText("ホイップクリーム増量")).toBeInTheDocument();
    expect(await screen.findByText("シナモン")).toBeInTheDocument();
    expect(await screen.findByText("メープル")).toBeInTheDocument();
    expect(await screen.findByText("きなこ")).toBeInTheDocument();
    expect(await screen.findByText("ココナッツ")).toBeInTheDocument();
    expect(await screen.findByText("アイス")).toBeInTheDocument();
    expect(await screen.findByText("マシュマロ")).toBeInTheDocument();
    expect(await screen.findByText("ナッツ")).toBeInTheDocument();
    expect(await screen.findByText("ナッツ")).toBeInTheDocument();
    expect(await screen.findByText("ココアパウダー")).toBeInTheDocument();
    expect(await screen.findByText("バニラシロップ")).toBeInTheDocument();
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
  });
});

describe("Auto Calc", () => {
  let store: any;
  beforeEach(() => {
    store = createStore(
      combineReducers({ products: ProductsReducers }),
      applyMiddleware(routerMiddleware(history), thunk)
    );
  });
  it("Should display total price automaticaly", async () => {
    render(
      <Provider store={store}>
        <ItemDetailForTest />
      </Provider>
    );
    userEvent.click(await screen.findByText("L 700円"));
    userEvent.click(await screen.findByText("コーヒークリーム"));
    userEvent.click(await screen.findByText("低脂肪牛乳"));
    userEvent.click(await screen.findByText("豆乳"));
    expect(screen.getByTestId("total-value")).toHaveTextContent(/1,600/);
  });
});

describe("Add Cart API", () => {
  let store: any;
  beforeEach(() => {
    store = createStore(
      combineReducers({ products: ProductsReducers }),
      applyMiddleware(routerMiddleware(history), thunk)
    );
  });
  it("Should post item in the shopping cart collectly", async () => {
    render(
      <Provider store={store}>
        <ItemDetailForTest />
      </Provider>
    );
    userEvent.click(await screen.findByText("L 700円"));
    userEvent.click(await screen.findByText("コーヒークリーム"));
    userEvent.click(await screen.findByText("低脂肪牛乳"));
    userEvent.click(await screen.findByText("豆乳"));
    userEvent.click(await screen.getByText("カートに追加する"));

    // expect(await cart.data.order_items[0].item_id.name).toBe("Gorgeous4サンド");
    // expect(await cart.data.order_items[0].size).toBe("L");
    // expect(await cart.data.order_items[0].order_toppings[0].topping.name).toBe(
    //   "コーヒークリーム"
    // );
    // expect(await cart.data.order_items[0].order_toppings[1].topping.name).toBe(
    //   "低脂肪牛乳"
    // );
    // expect(await cart.data.order_items[0].order_toppings[2].topping.name).toBe(
    //   "豆乳"
    // );
  });
});
