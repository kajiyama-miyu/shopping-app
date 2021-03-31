import React, { useMemo } from "react";
import { makeStyles, Divider } from "@material-ui/core";
import { TextDetail } from "../CommonParts/index";

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
  spaceSmall: {
    height: "12px",
  },
  priceBox: {
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: 4,
    height: 120,
    margin: "24px auto 16px auto",
    padding: 16,
    width: 380,
  },
});

type Props = {
  totalPrice: number;
};

const PriceBox: React.FC<Props> = (props) => {
  const { totalPrice } = props;
  const classes = useStyles();

  const prodactsPrice = useMemo(() => {
    let price: number = 0;
    price = totalPrice + totalPrice * 0.1;
    return price;
  }, [totalPrice]);

  const productTax = useMemo(() => {
    let tax: number = 0;
    tax = totalPrice * 0.1;
    return tax;
  }, [totalPrice]);

  return (
    <div className={classes.priceBox}>
      <TextDetail
        label={"商品合計"}
        value={totalPrice.toLocaleString() + "円"}
      />
      <TextDetail label={"消費税"} value={productTax.toLocaleString() + "円"} />
      <Divider />
      <div className={classes.spaceSmall} />
      <TextDetail
        label={"商品合計（税込）"}
        value={prodactsPrice.toLocaleString() + "円"}
      />
    </div>
  );
};

export default PriceBox;
