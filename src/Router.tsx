import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  SignUp,
  SignIn,
  ItemList,
  ItemDetail,
  ShoppingCart,
  OrderComfirm,
  OrderFinished,
  OrderHistory,
} from "./templates/index";
import { AuthProvider } from "./auth/AuthProvider";
import { PrivateRoute } from "./auth/index";
import { Header } from "./components/Header/index";

const Router: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
      <Switch>
        <Route exact path={"/"} component={SignIn} />
        <Route exact path={"/signup"} component={SignUp} />
        <Route exact path={"/showList"} component={ItemList} />
        <Route exact path={"/itemDetail/:id"} component={ItemDetail} />
        <PrivateRoute exact path={"/cart"} component={ShoppingCart} />
        <PrivateRoute exact path={"/orderConfirm"} component={OrderComfirm} />
        <PrivateRoute exact path={"/orderFinish"} component={OrderFinished} />
        <PrivateRoute exact path={"/history"} component={OrderHistory} />
      </Switch>
    </AuthProvider>
  );
};

export default Router;
