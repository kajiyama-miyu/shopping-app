import React, { useEffect, useState, useContext } from "react";
import { SearchBox, ProductsCard } from "../components/products/index";
import { makeStyles, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getItemState } from "../reducks/products/selectors";
import { RootState } from "../reducks/store/rootReducer";
import { Items } from "../reducks/products/type";
import { fetchItems } from "../reducks/products/operations";
import { AuthContext } from "../auth/AuthProvider";
const useStyles = makeStyles({
  root: {
    marginTop: 30,
    marginRight: 20,
  },
  search: {
    marginTop: 100,
  },
});

const ItemList: React.FC = () => {
  const classes = useStyles();
  const selector = useSelector((state: RootState) => state);
  const items = getItemState(selector);
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [setToken]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const [searchItem, setSearchItem] = useState<Array<Items>>(items);
  const [products, setProducts] = useState<Array<Items>>(items);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  useEffect(() => {
    setProducts(searchItem);
  }, [searchItem]);

  return (
    <>
      <section className="c-section-wrapin">
        <div className="p-grid__row">
          <Grid
            container
            spacing={0}
            alignItems="center"
            justify="center"
            className={classes.search}
          >
            <Grid item>
              <SearchBox items={items} setSearchItem={setSearchItem} />
            </Grid>
          </Grid>
          {products.length > 0 &&
            products.map((item: Items) => (
              <div className={classes.root} key={item.id.toString()}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ProductsCard
                      name={item.name}
                      priceM={item.price_m}
                      priceL={item.price_l}
                      imagePath={item.image_path}
                      id={item.id}
                    />
                  </Grid>
                </Grid>
              </div>
            ))}
          {/* {!products && (
            <Grid container justify="center" alignItems="center" spacing={0}>
              <Grid item>商品がありません</Grid>
            </Grid>
          )} */}
        </div>
      </section>
    </>
  );
};

export default ItemList;
