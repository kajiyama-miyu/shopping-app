import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexFlow: "row wrap",
    marginBottom: 16,
  },
  label: {
    marginLeft: 0,
    marginRight: "auto",
  },
  value: {
    fontWeight: 600,
    marginLeft: "auto",
    marginRight: 0,
  },
});

type Props = {
  label: string;
  value: string;
};

const TextDetail: React.FC<Props> = (props) => {
  const { label, value } = props;
  const classes = useStyles();
  return (
    <div className={classes.row}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
};

export default TextDetail;
