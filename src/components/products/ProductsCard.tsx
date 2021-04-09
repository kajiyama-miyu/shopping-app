import React from "react";
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    display: "flex",
  },
  content: {
    display: "flex",
    padding: "16 8",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  price: {
    color: theme.palette.secondary.dark,
    fontSize: 16,
  },
}));

export type Props = {
  id: number;
  name: string;
  priceM: number;
  priceL: number;
  imagePath: string | undefined;
};

const ProductsCard: React.FC<Props> = (props) => {
  const { name, priceM, priceL, imagePath, id } = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="商品イメージ画像"
          image={"/image/" + imagePath}
          height="auto"
          title=""
          onClick={() => dispatch(push("/itemDetail/" + id))}
        />
        <CardContent>
          <Typography color="textSecondary" component="p" align="center">
            {name}
          </Typography>
          <Typography component="p" align="center" className={classes.price}>
            M {priceM}
          </Typography>
          <Typography component="p" align="center" className={classes.price}>
            M {priceL}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductsCard;
