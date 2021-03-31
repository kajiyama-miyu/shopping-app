import React, { useEffect, useState, useMemo } from "react";
import { ProductDetailCard } from "../components/products/index";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { PrimaryButton } from "../components/CommonParts/index";
import {
  RadioButton,
  PrimaryCheckBox,
  SelectBox,
} from "../components/CommonParts/index";
import { Items } from "../reducks/products/type";
import { AddCart } from "../reducks/user/type";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../reducks/store/rootReducer";
import { addProductsCart } from "../reducks/user/operations";
import { useDispatch } from "react-redux";
import { fetchToppings } from "../reducks/products/operations";
import { getToppingState } from "../reducks/products/selectors";
import { OrderTopping } from "../reducks/user/type";

const useStyles = makeStyles({
  root: {
    marginTop: 30,
    marginRight: 20,
  },
  detail: {
    marginTop: 100,
  },
  space: {
    marginTop: 30,
  },
  spaceButtom: {
    marginBottom: 50,
  },
  fontStyle: {
    fontSize: "xx-large",
  },
  priceWidth: {
    maxWidth: 300,
  },
});

const ItemDetail: React.FC = () => {
  const classes = useStyles();

  const [detail, setDetail] = useState<Items>({
    id: 0,
    name: "",
    description: "",
    price_m: 0,
    price_l: 0,
    image_path: "",
    deleted: false,
  });
  const [radio, setRadio] = useState("M");
  const [toppings, setToppings] = useState<Array<string>>(["1"]);
  const [toppingList, setToppingList] = useState<Array<OrderTopping>>([]);
  const [numberOfProducts, setNumberOfProducts] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [addCart, setAddCart] = useState<AddCart>({
    order_item: { item: 0, size: "", quantity: 0, order_toppings: [] },
    status: 0,
  });

  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => state);
  const topping = getToppingState(selector);
  const path = selector.router.location.pathname;
  const id = path.split("/itemDetail/")[1];

  const changeToppingType = useMemo(() => {
    let list: Array<OrderTopping> = [];
    toppings.map((topping: string) => list.push({ topping: Number(topping) }));
    return list;
  }, [toppings]);

  useEffect(() => {
    setToppingList(changeToppingType);
  }, [setToppingList, changeToppingType]);

  const autoCalc = useMemo(() => {
    let itemPrice: number = 0;
    let toppingPrice: number = 0;
    let totalPrice: number = 0;

    if (radio === "M") {
      itemPrice = detail.price_m;
    } else if (radio === "L") {
      itemPrice = detail.price_l;
    }

    if (radio === "M") {
      toppingPrice = 200;
    } else if (radio === "L") {
      toppingPrice = 300;
    }

    const toppingCount = toppings.length;

    totalPrice = (itemPrice + toppingPrice * toppingCount) * numberOfProducts;

    return totalPrice;
  }, [detail, toppings, radio, numberOfProducts]);

  useEffect(() => {
    setTotalPrice(autoCalc);
  }, [autoCalc]);

  useEffect(() => {
    axios.get<Items>("http://35.73.116.71/api/item/" + id).then((res) => {
      setDetail(res.data);
    });
  }, [setDetail, id]);

  useEffect(() => {
    dispatch(fetchToppings());
  }, [dispatch]);

  useEffect(() => {
    setAddCart({
      order_item: {
        item: detail.id,
        size: radio,
        quantity: numberOfProducts,
        order_toppings: toppingList,
      },
      status: 0,
    });
  }, [setAddCart, detail.id, radio, numberOfProducts, toppingList]);

  const handleAddCart = () => {
    dispatch(addProductsCart(addCart));
  };

  return (
    <>
      <div>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="center"
          className={classes.detail}
        >
          <Grid item>
            <ProductDetailCard detail={detail} />
          </Grid>
        </Grid>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item className={classes.space}>
            <RadioButton detail={detail} setRadio={setRadio} />
          </Grid>
        </Grid>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item className={classes.space}>
            <PrimaryCheckBox toppings={topping} setToppings={setToppings} />
          </Grid>
        </Grid>
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item className={classes.space} xs={1}>
            <SelectBox setNumberOfProducts={setNumberOfProducts} />
          </Grid>
        </Grid>
        <div className={classes.spaceButtom} />
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item className={classes.priceWidth}>
            <Typography component="p" variant="h5">
              合計金額:　{totalPrice.toLocaleString()}円(税抜)
            </Typography>
          </Grid>
        </Grid>
        <div className={classes.spaceButtom} />
        <Grid container spacing={0} alignItems="center" justify="center">
          <Grid item>
            <PrimaryButton
              label={"カートに追加する"}
              onClick={() => handleAddCart()}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default ItemDetail;
