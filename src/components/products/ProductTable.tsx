import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  makeStyles,
  IconButton,
  Grid,
} from "@material-ui/core";
import { ProductTableCell } from "../CommonParts/index";
import { Order, OrderItems } from "../../reducks/user/type";
import { Delete } from "@material-ui/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showCart } from "../../reducks/user/operations";

const useStyles = makeStyles({
  table: {
    minWidth: 880,
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
  cartItem: Order;
};

const ProductTable: React.FC<Props> = (props) => {
  const { cartItem } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeleteProduct = async (orderItemId: number) => {
    await axios.delete("http://35.73.116.71/api/delete_cart/" + orderItemId, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    dispatch(showCart());
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead className={classes.header}>
          <TableRow>
            <ProductTableCell align={"center"}>商品名</ProductTableCell>
            <ProductTableCell align={"center"}>
              サイズ、価格（税抜）、数量
            </ProductTableCell>
            <ProductTableCell align={"center"}>
              トッピング、価格（税抜）
            </ProductTableCell>
            <ProductTableCell align={"center"}>小計</ProductTableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItem.order_items.map((orderItem: OrderItems) => (
            <TableRow key={orderItem.id}>
              <ProductTableCell align={"right"}>
                <Grid
                  container
                  alignItems="center"
                  justify="center"
                  spacing={0}
                >
                  <Grid item>
                    <img
                      src={"/image/" + orderItem.item_id.image_path}
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
                  <Grid item>{orderItem.item_id.name}</Grid>
                </Grid>
              </ProductTableCell>
              <ProductTableCell align={"center"}>
                {orderItem.size}
                {"  "}
                {orderItem.size === "M" && orderItem.item_id.price_m + "円"}
                {orderItem.size === "L" && orderItem.item_id.price_l + "円"}
                {orderItem.quantity}個
              </ProductTableCell>
              <ProductTableCell align={"left"}>
                {orderItem.order_toppings.map((topping) => (
                  <ul className={classes.list} key={topping.id}>
                    <li>
                      {topping.topping.name}
                      {"  "}
                      {orderItem.size === "M" && topping.topping.price_m + "円"}
                      {orderItem.size === "L" && topping.topping.price_l + "円"}
                    </li>
                  </ul>
                ))}
              </ProductTableCell>
              <ProductTableCell align={"left"}>
                {orderItem.size === "M" &&
                  orderItem.item_id.price_m * orderItem.quantity +
                    orderItem.order_toppings.length * 200 * orderItem.quantity +
                    "円"}
                {orderItem.size === "L" &&
                  orderItem.item_id.price_l * orderItem.quantity +
                    orderItem.order_toppings.length * 300 * orderItem.quantity +
                    "円"}
              </ProductTableCell>
              <ProductTableCell align={"left"}>
                <IconButton onClick={() => handleDeleteProduct(orderItem.id)}>
                  <Delete />
                </IconButton>
              </ProductTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
