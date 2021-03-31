import React, { useCallback } from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import { PrimaryButton } from "../components/CommonParts/index";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles({
  section: {
    margin: "0 auto",
    maxWidth: "575px",
    position: "relative",
    padding: "0 1rem",
    textAlign: "center",
    width: "100%",
    marginTop: 100,
  },
  spaceMedium: {
    height: "32px",
  },
  spaceSmall: {
    height: "12px",
  },
});

const OrderFinished: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const goBackToTop = useCallback(() => {
    dispatch(push("/showList"));
  }, [dispatch]);

  return (
    <>
      <section className={classes.section}>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Typography component="p" variant="h4">
              決済が完了しました！
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.spaceMedium} />
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Typography component="p" variant="subtitle1">
              この度はご注文ありがとうございます。
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.spaceSmall} />
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Typography component="p" variant="subtitle1">
              お支払い先は、お送りしたメールに記載してありますのでご確認ください。
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.spaceSmall} />
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Typography component="p" variant="subtitle1">
              メールが届かない場合は「注文履歴」からご確認ください。
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.spaceMedium} />
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <PrimaryButton
              label={"トップ画面の戻る"}
              onClick={() => goBackToTop()}
            />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default OrderFinished;
