import React from "react";
import { FormControlLabel, Radio } from "@material-ui/core";

type Props = {
  value: any;
  label: string;
  inputRef?: (ref: any) => void;
};

const RadioButtonParts: React.FC<Props> = (props) => {
  const { value, label, inputRef } = props;
  return (
    <FormControlLabel
      value={value}
      control={<Radio inputRef={inputRef} />}
      label={label}
    />
  );
};

export default RadioButtonParts;
