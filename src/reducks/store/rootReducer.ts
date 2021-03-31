import { createStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import * as History from "history";
import thunk from "redux-thunk";
import { UserReducer } from "../user/reducers";
import { ProductsReducers } from "../products/reducers";
import { LoadingReducer } from "../loading/reducers";
import { OrderHistoryReducer } from "../history/reducers";

//reduxのstoreでルーティングを管理
//historyは今までどこのpathにいたのか、今はどこのpathにいるのかという情報を持っているもの
export const history = History.createBrowserHistory();

export const rootReducer = combineReducers({
  router: connectRouter(history),
  user: UserReducer,
  loading: LoadingReducer,
  products: ProductsReducers,
  ordered: OrderHistoryReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(routerMiddleware(history), thunk)
);

export type RootState = ReturnType<typeof rootReducer>;
