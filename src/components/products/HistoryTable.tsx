import React, { useMemo } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  makeStyles,
  TableCell,
  Grid,
} from "@material-ui/core";
import { ProductTableCell } from "../CommonParts/index";
import { Order } from "../../reducks/user/type";
import dayjs from "dayjs";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  image: {
    objectFit: "cover",
    margin: 16,
    height: 96,
    width: 96,
  },
  list: {
    listStyle: "none",
  },
  header: {
    backgroundColor: "#EEEEEE",
  },
});

type Props = {
  orders: Order;
};

const HistoryTable: React.FC<Props> = (props) => {
  const { orders } = props;
  const classes = useStyles();

  const orderDate = useMemo(() => {
    let date = dayjs();
    let dateSt = "";
    if (orders.order_date !== null) {
      date = dayjs(orders.order_date);
    }
    dateSt = `${date.year()}-${date.month() + 1}-${date.date()}`;

    return dateSt;
  }, [orders.order_date]);

  const deliveryTime = useMemo(() => {
    let time = dayjs();
    let timeSt = "";
    if (orders.delivery_time !== null) {
      time = dayjs(orders.delivery_time);
    }
    timeSt = `${time.month() + 1}月${time.date()}日 ${time
      .hour(18)
      .hour()}時${time.minute(0).minute()}分`;

    return timeSt;
  }, [orders.delivery_time]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="history table">
        <TableHead className={classes.header}>
          <TableRow>
            <ProductTableCell align={"center"}>注文日</ProductTableCell>
            <ProductTableCell align={"center"}>注文商品</ProductTableCell>
            <ProductTableCell align={"center"}>宛先</ProductTableCell>
            <TableCell align="center" style={{ width: 100 }}>
              合計金額
            </TableCell>
            <ProductTableCell align={"center"}>お支払い方法</ProductTableCell>
            <ProductTableCell align={"center"}>決済状況</ProductTableCell>
            <ProductTableCell align={"center"}>配達日時</ProductTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <ProductTableCell align={"center"}>{orderDate}</ProductTableCell>
            <ProductTableCell align={"center"}>
              {orders.order_items.map((order) => (
                <div key={order.id}>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={0}
                  >
                    <Grid item>
                      <img
                        src={"/image/" + order.item_id.image_path}
                        className={classes.image}
                        alt="商品イメージ"
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={0}
                  >
                    <Grid item>{order.item_id.name}</Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={0}
                  >
                    <Grid item>
                      {order.size}サイズ
                      {"  "}
                      {order.size === "M" && order.item_id.price_m + "円"}
                      {order.size === "L" && order.item_id.price_l + "円"}
                      {order.quantity}個
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={0}
                  >
                    <Grid item>
                      {order.order_toppings.map((topping) => (
                        <ul className={classes.list} key={topping.id}>
                          <li>
                            {topping.topping.name}
                            {"  "}
                            {order.size === "M" &&
                              topping.topping.price_m + "円"}
                            {order.size === "L" &&
                              topping.topping.price_l + "円"}
                          </li>
                        </ul>
                      ))}
                    </Grid>
                  </Grid>
                </div>
              ))}
            </ProductTableCell>
            <ProductTableCell align={"center"}>
              {orders.destination_name}
            </ProductTableCell>
            <ProductTableCell align={"center"}>
              {orders.total_price.toLocaleString()}円
            </ProductTableCell>
            <ProductTableCell align={"center"}>
              {orders.payment_method === 1 && "代金引換"}
              {orders.payment_method === 2 && "クレジットカード払い"}
            </ProductTableCell>
            <ProductTableCell align={"center"}>
              {orders.status === 1 && "未入金"}
              {orders.status === 2 && "入金済"}
            </ProductTableCell>
            <ProductTableCell align={"center"}>{deliveryTime}</ProductTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
