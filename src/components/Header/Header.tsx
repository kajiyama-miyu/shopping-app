import React from "react";
import { makeStyles, createStyles, AppBar, Toolbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { HeaderMenu } from "./index";
import { push } from "connected-react-router";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: "#fff",
      color: "#444",
    },
    toolbar: {
      margin: "0 auto",
      maxWidth: 1024,
      width: "100%",
    },
    iconButtons: {
      margin: "0 0 0 auto",
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolbar}>
          <img
            alt="Logo"
            src={"/image/header_logo.png"}
            onClick={() => dispatch(push("/showList"))}
          />
          <div className={classes.iconButtons}>
            <HeaderMenu />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
