import React from "react";
import { TextField } from "@material-ui/core";

export type Props = {
  fullwidth: boolean;
  label: string;
  multiline: boolean;
  required?: boolean;
  value: any;
  type: string;
  rows: number | string;
  variant?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: (ref: any) => void;
  helperText?: string | undefined;
  error?: boolean;
  InputProps?: object;
  name?: string;
  autoComplete?: string | undefined;
  FormHelperTextProps?: object;
  placeholder?: string;
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
    variant,
    inputRef,
    helperText,
    error,
    InputProps,
    name,
    autoComplete,
    FormHelperTextProps,
    placeholder,
  } = props;
  return (
    <TextField
      fullWidth={fullwidth}
      label={label}
      name={name}
      margin="dense"
      multiline={multiline}
      required={required}
      value={value}
      rows={rows}
      type={type}
      variant={variant}
      inputRef={inputRef}
      error={error}
      helperText={helperText}
      onChange={onChange}
      InputProps={InputProps}
      autoComplete={autoComplete}
      FormHelperTextProps={FormHelperTextProps}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
