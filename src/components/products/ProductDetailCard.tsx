import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Items } from "../../reducks/products/type";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 650,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 250,
  },
  space: {
    height: "25px",
  },
}));

type Props = {
  detail: Items;
};

const ProductDetailCard: React.FC<Props> = (props) => {
  const { detail } = props;
  const path = detail.image_path!.split(
    "http://35.73.116.71/static/img_coffee/"
  )[1];

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt="商品イメージ画像"
        title=""
        className={classes.cover}
        image={"/image/" + path}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" align="center" variant="h5">
            商品詳細
          </Typography>
          <div className={classes.space} />
          <Typography
            component="h6"
            align="center"
            color="textPrimary"
            variant="h6"
          >
            {detail.name}
          </Typography>
          <div className={classes.space} />
          <Typography component="p" align="center" color="textSecondary">
            {detail.description}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductDetailCard;
