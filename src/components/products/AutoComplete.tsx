import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { Items } from "../../reducks/products/type";

export type Props = {
  items: Array<Items>;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
};

const AutocompleteInput: React.FC<Props> = (props) => {
  const { items, setSearchWord } = props;
  const [text, setText] = useState("");

  const itemNameList = useMemo(() => {
    let datalist: Array<string> = [];

    for (let u of items) {
      datalist.push(u.name);
    }

    return datalist;
  }, [items]);

  const setTexts = useCallback(
    (value: string) => {
      if (value !== null) {
        setText(value);
      } else {
        setText("");
      }
    },
    [setText]
  );

  useEffect(() => {
    setSearchWord(text);
  }, [text, setSearchWord]);

  return (
    <Autocomplete
      options={itemNameList}
      getOptionLabel={(name) => name}
      style={{ width: 300 }}
      freeSolo
      inputValue={text}
      onChange={(e, v) => setTexts(v!)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="商品検索"
          variant="outlined"
          value={text}
          onChange={(e) => setTexts(e.target.value)}
        />
      )}
    />
  );
};

export default AutocompleteInput;
