import React, { useEffect } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { ProductTable, PriceBox } from "../components/products/index";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducks/store/rootReducer";
import { getCartItem } from "../reducks/user/selector";
import { OrderForm } from "../components/User/index";
import { orderProducts } from "../reducks/products/operations";
import { OrderProducts } from "../reducks/products/type";
import { showCart } from "../reducks/user/operations";

const useStyles = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 512,
    width: "100%",
    display: "flex",
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
  formStyle: {
    margin: "0rem auto",
    maxWidth: "400px",
    height: "auto",
    width: "calc(100% - 2rem)",
  },
  orderBox: {
    display: "flex",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 4,
    height: 800,
    margin: "24px auto 16px auto",
    padding: 16,
    width: 380,
  },
  payment: {
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 4,
    height: 50,
    margin: "24px auto 16px auto",
    padding: 16,
    width: 380,
  },
  buttonStyle: {
    backgroundColor: "#33CCFF",
    color: "#000",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
});

const OrderConfirm: React.FC = () => {
  const classes = useStyles();

  const selector = useSelector((state: RootState) => state);
  const productsInCart = getCartItem(selector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showCart());
  }, [dispatch]);

  const handleOrder = (orders: OrderProducts) => {
    dispatch(orderProducts(orders));
  };

  return (
    <>
      <section className={classes.section}>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Typography component="h2" className={classes.headline}>
            注文内容確認
          </Typography>
        </Grid>
        <div className={classes.spaceMedium} />
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
        <div className={classes.spaceSmall} />

        <OrderForm
          handleOrder={handleOrder}
          total_price={productsInCart.total_price}
        />
      </section>
    </>
  );
};

export default OrderConfirm;
