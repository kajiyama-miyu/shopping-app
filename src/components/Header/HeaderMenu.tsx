import React, { useContext } from "react";
import { Button, IconButton } from "@material-ui/core";
import { History, ShoppingCart } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import { AuthContext } from "../../auth/AuthProvider";

const HeaderMenu: React.FC = () => {
  const { token, logout } = useContext(AuthContext);

  const dispatch = useDispatch();

  return (
    <>
      {token && (
        <>
          <IconButton onClick={() => dispatch(push("/cart"))}>
            <ShoppingCart />
          </IconButton>
          <IconButton onClick={() => dispatch(push("/history"))}>
            <History />
          </IconButton>
          <Button onClick={() => logout()} variant="contained">
            Logout
          </Button>
        </>
      )}
    </>
  );
};

export default HeaderMenu;
