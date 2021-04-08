import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Router } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history, store } from "./reducks/store/rootReducer";
import { Provider } from "react-redux";

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
  const linkElement = screen.queryByText(/learn react/i);
  expect(linkElement).toBeNull();
});
