import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { ItemList } from "../templates/index";
import { Provider } from "react-redux";
import { history, store } from "../reducks/store/rootReducer";
import { ProductsReducers } from "../reducks/products/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});

describe("Rendering item from API collectly", () => {
  let store: any;
  beforeEach(() => {
    store = createStore(
      combineReducers({ products: ProductsReducers }),
      applyMiddleware(routerMiddleware(history), thunk)
    );
  });
  it("[Fetch sucess] Should display item info collectly", async () => {
    render(
      <Provider store={store}>
        <ItemList />
      </Provider>
    );
    expect(await screen.findByText("Gorgeous4サンド")).toBeInTheDocument();
    expect(
      await screen.findByText("エスプレッソフラペチーノ")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Specialキャラメルドーナッツ")
    ).toBeInTheDocument();
    expect(await screen.findByText("チョコクッキー")).toBeInTheDocument();
    expect(await screen.findByText("カフェモカ")).toBeInTheDocument();
    expect(await screen.findByText("カフェラテ")).toBeInTheDocument();
    expect(await screen.findByText("カプチーノ")).toBeInTheDocument();
    expect(await screen.findByText("キャラメルマキアート")).toBeInTheDocument();
    expect(
      await screen.findByText("キャラメルフラペチーノ")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("バニラ クリーム フラペチーノ")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("ダークモカフラペチーノ")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("抹茶クリームフラペチーノ")
    ).toBeInTheDocument();
    expect(await screen.findByText("ドリップコーヒー")).toBeInTheDocument();
    expect(await screen.findByText("アメリカン")).toBeInTheDocument();
    expect(await screen.findByText("エスプレッソ")).toBeInTheDocument();
    expect(await screen.findByText("ナッティホワイトモカ")).toBeInTheDocument();
    expect(
      await screen.findByText("ジンジャーブレッドラテ")
    ).toBeInTheDocument();
  });
  it("[Fetch success] Should diaplay the item when the item is searched", async () => {
    render(
      <Provider store={store}>
        <ItemList />
      </Provider>
    );
    const input = screen.getByPlaceholderText("商品名");
    userEvent.type(input, "Gorgeous4サンド");
    userEvent.click(screen.getByText("検索"));
    expect(await screen.findByText("Gorgeous4サンド")).toBeInTheDocument();
  });
  it("[Fetch Failed] Should diaplay all items when the item name is searched and it isn't exist", async () => {
    render(
      <Provider store={store}>
        <ItemList />
      </Provider>
    );
    const input = screen.getByPlaceholderText("商品名");
    userEvent.type(input, "aaa");
    userEvent.click(screen.getByText("検索"));
    expect(await screen.findByText("Gorgeous4サンド")).toBeInTheDocument();
    expect(
      await screen.findByText("エスプレッソフラペチーノ")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Specialキャラメルドーナッツ")
    ).toBeInTheDocument();
    expect(await screen.findByText("チョコクッキー")).toBeInTheDocument();
    expect(await screen.findByText("カフェモカ")).toBeInTheDocument();
    expect(await screen.findByText("カフェラテ")).toBeInTheDocument();
    expect(await screen.findByText("カプチーノ")).toBeInTheDocument();
    expect(await screen.findByText("キャラメルマキアート")).toBeInTheDocument();
    expect(
      await screen.findByText("キャラメルフラペチーノ")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("バニラ クリーム フラペチーノ")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("ダークモカフラペチーノ")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("抹茶クリームフラペチーノ")
    ).toBeInTheDocument();
    expect(await screen.findByText("ドリップコーヒー")).toBeInTheDocument();
    expect(await screen.findByText("アメリカン")).toBeInTheDocument();
    expect(await screen.findByText("エスプレッソ")).toBeInTheDocument();
    expect(await screen.findByText("ナッティホワイトモカ")).toBeInTheDocument();
    expect(
      await screen.findByText("ジンジャーブレッドラテ")
    ).toBeInTheDocument();
  });
});
