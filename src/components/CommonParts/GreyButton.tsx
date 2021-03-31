import React from "react";
import { Button, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.grey["300"],
      fontSize: 16,
      height: 48,
      marginBottom: 16,
      width: 256,
    },
  })
);

type Props = {
  onClick: () => void;
  label: string;
};
const GreyButton: React.FC<Props> = (props) => {
  const { onClick, label } = props;
  const classes = useStyles();
  return (
    <Button className={classes.button} variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
};

export default GreyButton;
