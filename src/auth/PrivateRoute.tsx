import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { SignIn } from "../templates/index";
import { Route } from "react-router-dom";

type Props = {
  component: React.FC;
  exact: boolean;
  path: string;
};

const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  ...options
}) => {
  const { token } = useContext(AuthContext);

  const Component = token ? RouteComponent : SignIn;

  return <Route {...options} component={Component} />;
};

export default PrivateRoute;
