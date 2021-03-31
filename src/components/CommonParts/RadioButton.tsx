import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, RadioGroup } from "@material-ui/core";
import { RadioButtonParts } from "./index";
import { Items } from "../../reducks/products/type";

type Props = {
  detail: Items;
  setRadio: React.Dispatch<React.SetStateAction<string>>;
};

const RadioButtonGroup: React.FC<Props> = (props) => {
  const { detail, setRadio } = props;
  const [value, setValue] = useState("M");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue("M");
  }, [detail.price_m]);

  useEffect(() => {
    setRadio(value);
  }, [value, setRadio]);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">サイズ</FormLabel>
      <RadioGroup
        aria-label="size"
        name="size"
        value={value}
        onChange={handleChange}
        row
      >
        <RadioButtonParts value={"M"} label={`M　${detail.price_m}円`} />
        <RadioButtonParts value={"L"} label={`L　${detail.price_l}円`} />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
