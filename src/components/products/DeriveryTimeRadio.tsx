import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import { RadioButtonParts } from "../CommonParts/index";

type Props = {
  helperText: string | undefined;
  handleDeliveryTime: (value: number) => void;
  name: string;
};

const useStyles = makeStyles({
  radioSpace: {
    maxWidth: "300px",
  },
  errorMsg: {
    color: "red",
  },
});

const DeriveryTimeRadio: React.FC<Props> = (props) => {
  const { helperText, handleDeliveryTime, name } = props;
  const [value, setValue] = useState("10");
  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    handleDeliveryTime(Number(value));
  }, [value, handleDeliveryTime]);

  return (
    <FormControl component="fieldset" name={name}>
      <FormLabel component="legend">配達時間</FormLabel>
      <RadioGroup
        aria-label="time"
        name="time"
        value={value}
        onChange={handleChange}
        row
      >
        <Grid container justify="center" className={classes.radioSpace}>
          <RadioButtonParts value={"10"} label={"10時"} />
          <RadioButtonParts value={"11"} label={"11時"} />
          <RadioButtonParts value={"12"} label={"12時"} />
          <RadioButtonParts value={"13"} label={"13時"} />
          <RadioButtonParts value={"14"} label={"14時"} />
          <RadioButtonParts value={"15"} label={"15時"} />
          <RadioButtonParts value={"16"} label={"16時"} />
          <RadioButtonParts value={"17"} label={"17時"} />
          <RadioButtonParts value={"18"} label={"18時"} />
        </Grid>
      </RadioGroup>
      <Grid container justify="center">
        <FormHelperText className={classes.errorMsg}>
          {helperText}
        </FormHelperText>
      </Grid>
    </FormControl>
  );
};

export default DeriveryTimeRadio;
