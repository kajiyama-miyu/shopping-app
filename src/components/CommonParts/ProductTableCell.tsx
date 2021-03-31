import React from "react";
import { TableCell } from "@material-ui/core";

type Props = {
  align: any;
};

const ProductTableCell: React.FC<Props> = (props) => {
  const { align, children } = props;
  return <TableCell align={align}>{children}</TableCell>;
};

export default ProductTableCell;
