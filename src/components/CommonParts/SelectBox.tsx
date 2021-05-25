import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  formControl: {
    minWidth: 150,
  },
});

type Props = {
  setNumberOfProducts: React.Dispatch<React.SetStateAction<number>>;
};

const SelectBox: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { setNumberOfProducts } = props;
  const [select, setSelect] = useState(1);

  const handleChange = (value: string) => {
    setSelect(Number(value));
  };

  useEffect(() => {
    setNumberOfProducts(select);
  }, [setNumberOfProducts, select]);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-label">数量</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={select}
        onChange={(e) => {
          handleChange(e.target.value as string);
        }}
        fullWidth
        autoFocus
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectBox;
