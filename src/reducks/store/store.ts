import { createStore, combineReducers, applyMiddleware } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import * as History from "history";
import thunk from "redux-thunk";

//reduxのstoreでルーティングを管理
//historyは今までどこのpathにいたのか、今はどこのpathにいるのかという情報を持っているもの
const Store = (history: History.History<unknown>) => {
  return createStore(
    combineReducers({
      router: connectRouter(history),
    }),
    //導入したいミドルウェアの数だけ引数を受け取ることができる
    applyMiddleware(routerMiddleware(history), thunk)
  );
};

export default Store;
