import React from "react";
import { Button } from "@material-ui/core";

const styles: { [key: string]: React.CSSProperties } = {
  button: {
    backgroundColor: "#33CCFF",
    color: "#000",
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
};

export type Props = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
};

const PrimaryButton: React.FC<Props> = (props) => {
  const { label, onClick, disabled } = props;
  return (
    <Button
      style={styles.button}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default PrimaryButton;
