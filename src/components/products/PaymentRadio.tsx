import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormHelperText,
  Grid,
  RadioGroup,
  makeStyles,
} from "@material-ui/core";
import { RadioButtonParts } from "../CommonParts/index";

type Props = {
  setPayment: React.Dispatch<React.SetStateAction<number>>;

  helperText?: string | undefined;

  name: string;
};

const useStyles = makeStyles({
  buttonColor: {
    color: "red",
  },
});
const PaymentRadio: React.FC<Props> = (props) => {
  const { setPayment, helperText, name } = props;
  const [value, setValue] = useState("1");
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setPayment(Number(value));
  }, [value, setPayment]);

  return (
    <FormControl component="fieldset" name={name}>
      <RadioGroup
        aria-label="payment"
        name="payment"
        value={value}
        onChange={handleChange}
        row
      >
        <Grid container justify="center">
          <RadioButtonParts value={"1"} label={"代金引換"} />
          <RadioButtonParts value={"2"} label={"クレジットカード"} />
        </Grid>
      </RadioGroup>
      <Grid container justify="center" className={classes.buttonColor}>
        <FormHelperText>{helperText}</FormHelperText>
      </Grid>
    </FormControl>
  );
};

export default PaymentRadio;
