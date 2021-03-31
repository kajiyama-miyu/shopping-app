import React, { useCallback, useEffect } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { ProductTable, PriceBox } from "../components/products/index";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducks/store/rootReducer";
import { getCartItem } from "../reducks/user/selector";
import { PrimaryButton, GreyButton } from "../components/CommonParts/index";
import { push } from "connected-react-router";
import { showCart } from "../reducks/user/operations";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
  },
  section: {
    margin: "0 auto",
    maxWidth: "575px",
    position: "relative",
    padding: "0 1rem",
    textAlign: "center",
    width: "100%",
    marginTop: 100,
  },
  headline: {
    color: "#33CCFF",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
  },
  spaceMedium: {
    height: "32px",
  },
  spaceSmall: {
    height: "12px",
  },
});

const ShoppingCart: React.FC = () => {
  const classes = useStyles();

  const selector = useSelector((state: RootState) => state);
  const productsInCart = getCartItem(selector);

  const dispatch = useDispatch();

  const goToOrder = useCallback(() => {
    dispatch(push("/orderConfirm"));
  }, []);

  const goBackList = useCallback(() => {
    dispatch(push("/showList"));
  }, []);

  useEffect(() => {
    dispatch(showCart());
  }, []);

  return (
    <>
      <section className={classes.section}>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item>
            <Typography component="h2" className={classes.headline}>
              ショッピングカート
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.spaceMedium} />
        {productsInCart.id !== null && productsInCart.order_items.length !== 0 && (
          <>
            <Grid
              container
              spacing={0}
              alignItems="center"
              justify="center"
              className={classes.root}
            >
              <Grid item>
                <ProductTable cartItem={productsInCart} />
              </Grid>
            </Grid>
            <div className={classes.spaceMedium} />
            <Grid container spacing={0} alignItems="center" justify="center">
              <Grid item>
                <PriceBox totalPrice={productsInCart.total_price} />
              </Grid>
            </Grid>
            <div className={classes.spaceMedium} />
            <Grid container spacing={0} alignItems="center" justify="center">
              <Grid item>
                <PrimaryButton
                  label={"注文に進む"}
                  onClick={() => goToOrder()}
                />
              </Grid>
            </Grid>
          </>
        )}

        {productsInCart.id === null ||
          (productsInCart.order_items.length === 0 && (
            <>
              <Grid container spacing={0} alignItems="center" justify="center">
                <Grid item>
                  <Typography component="p" variant="h6">
                    まだカートの中身はありません
                  </Typography>
                </Grid>
              </Grid>
              <div className={classes.spaceMedium} />
            </>
          ))}
        <div className={classes.spaceSmall} />
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item>
            <GreyButton
              label={"ショッピングを続ける"}
              onClick={() => goBackList()}
            />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default ShoppingCart;
