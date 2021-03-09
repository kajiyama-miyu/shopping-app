import React from "react";
import { TextField } from "@material-ui/core";

export type Props = {
  fullwidth: boolean;
  label: string;
  multiline: boolean;
  required: boolean;
  value: any;
  type: string;
  rows: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const TextInput: React.FC<Props> = (props) => {
  const {
    fullwidth,
    label,
    multiline,
    required,
    value,
    type,
    rows,
    onChange,
  } = props;
  return (
    <TextField
      fullWidth={fullwidth}
      label={label}
      margin="dense"
      multiline={multiline}
      required={required}
      value={value}
      rows={rows}
      type={type}
      onChange={onChange}
    />
  );
};

export default TextInput;
