import React, { useEffect, useCallback } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { showOrderHistory } from "../reducks/history/operations";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducks/store/rootReducer";
import { getOrderHistory } from "../reducks/history/selector";
import { Order } from "../reducks/user/type";
import { HistoryTable } from "../components/products/index";
import { PrimaryButton } from "../components/CommonParts/index";
import { push } from "connected-react-router";

const useStyle = makeStyles({
  root: {
    margin: "0 auto",
    maxWidth: 1000,
    width: "100%",
  },
  section: {
    margin: "0 auto",
    maxWidth: "1000px",
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

const OrderHistory: React.FC = () => {
  const classes = useStyle();
  const selector = useSelector((state: RootState) => state);
  const orderHistory = getOrderHistory(selector);

  const dispatch = useDispatch();

  const goBackToTop = useCallback(() => {
    dispatch(push("/showList"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(showOrderHistory());
  }, [dispatch]);

  return (
    <>
      <section className={classes.section}>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Typography component="h2" className={classes.headline}>
            注文履歴
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
            {Array.isArray(orderHistory) &&
              orderHistory.map((history: Order) => (
                <HistoryTable orders={history} key={history.id} />
              ))}
            {!Array.isArray(orderHistory) && (
              <Typography component="p" variant="h6">
                商品履歴はまだありません
              </Typography>
            )}
          </Grid>
        </Grid>
        <div className={classes.spaceMedium} />
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item>
            <PrimaryButton
              label={"トップ画面に戻る"}
              onClick={() => goBackToTop()}
            />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default OrderHistory;
