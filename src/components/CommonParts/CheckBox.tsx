import React, { useState, useEffect, useCallback } from "react";
import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import { Toppings } from "../../reducks/products/type";

type Props = {
  toppings: Array<Toppings>;
  setToppings: React.Dispatch<React.SetStateAction<Array<string>>>;
};

const PrimaryCheckBox: React.FC<Props> = (props) => {
  const { toppings, setToppings } = props;
  const [checkItems, setCheckItem] = useState<any>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckItem({
        ...checkItems,
        [e.target.value]: e.target.checked,
      });
    },
    [setCheckItem, checkItems]
  );

  useEffect(() => {
    const selectToppings = Object.entries(checkItems).reduce(
      (pre: Array<string>, [key, value]) => {
        value && pre.push(key);
        return pre;
      },
      []
    );

    setToppings(selectToppings);
  }, [checkItems, setToppings]);

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        トッピング： 1つにつき М 200円(税抜) Ｌ 300円(税抜)
      </FormLabel>
      <FormGroup>
        {toppings.map((topping) => (
          <FormControlLabel
            control={
              <Checkbox
                id={topping.name}
                value={topping.id}
                onChange={handleChange}
                checked={checkItems[topping.name]}
              />
            }
            label={topping.name}
            key={topping.id.toString()}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default PrimaryCheckBox;
