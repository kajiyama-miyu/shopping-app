import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { SignUp, SignIn } from "./templates/index";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={SignUp} />
        <Route exact path={"/signin"} component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
