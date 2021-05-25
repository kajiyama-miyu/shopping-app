import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  CardActions,
  Grid,
} from "@material-ui/core";
import { AutoComplete } from "./index";
import { PrimaryButton } from "../CommonParts/index";
import { Items } from "../../reducks/products/type";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export type Props = {
  items: Array<Items>;
  setSearchItem: React.Dispatch<React.SetStateAction<Array<Items>>>;
  // products: Array<Items>;
};

const SearchBox: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { items, setSearchItem } = props;

  const [searchWord, setSearchWord] = useState("");

  const searchItem = (word: string) => {
    if (word !== null) {
      const updateItemList = items.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(word.toLowerCase()) >= 0 ||
          item.name.indexOf(word) >= 0
        );
      });
      setSearchItem(updateItemList);
    } else {
      setSearchItem(items);
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="商品を検索する" />
      <CardContent>
        <AutoComplete items={items} setSearchWord={setSearchWord} />
      </CardContent>
      <Grid container justify="center" alignItems="center" spacing={1}>
        <Grid item>
          <CardActions>
            <PrimaryButton
              label="検索"
              onClick={() => searchItem(searchWord)}
            />
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SearchBox;
