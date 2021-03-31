import React, { useState } from "react";
import { TextInput } from "../CommonParts/index";
import { User } from "../../reducks/user/type";
import {
  makeStyles,
  createStyles,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { SignUpValidation } from "../../service/validation";
import { sanitazeZipCode } from "../../service/address";
import axios from "axios";

export type Props = {
  handleSaveData: (use: User) => void;
};

type SignUpForm = {
  name: string;
  email: string;
  zipcode: string;
  prefecture: string;
  city: string;
  restAddress: string;
  telephone: string;
  password: string;
  confirmPassword: string;
};

type SignFormInfo = {
  info: SignUpForm;
};

type Error = {
  message: SignUpForm;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    button: {
      backgroundColor: theme.palette.grey["300"],
      fontSize: 16,
      marginBottom: 16,
    },
    errorColor: {
      color: "red",
    },
    space: {
      height: "48px",
    },
    mainButton: {
      margin: "0px auto",
      textAlign: "center",
    },
    buttonStyle: {
      backgroundColor: "#33CCFF",
      color: "#000",
      fontSize: 16,
      height: 48,
      marginBottom: 16,
      width: 256,
    },
  })
);

const UserForm: React.FC<Props> = (props) => {
  const { handleSaveData } = props;
  const classes = useStyles();

  const [error, setError] = useState<Error>({
      message: {
        name: "",
        email: "",
        zipcode: "",
        prefecture: "",
        city: "",
        restAddress: "",
        telephone: "",
        password: "",
        confirmPassword: "",
      },
    }),
    [form, setForm] = useState<SignFormInfo>({
      info: {
        name: "",
        email: "",
        zipcode: "",
        prefecture: "",
        city: "",
        restAddress: "",
        telephone: "",
        password: "",
        confirmPassword: "",
      },
    });

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name;
    const value = event.target.value;

    setForm({
      info: { ...form.info, [key]: value },
    });
    setError({
      message: {
        ...error.message,
        [key]: SignUpValidation(key, value),
      },
    });
  };

  const canSubmit = (): boolean => {
    const validInfo =
      Object.values(form.info).filter((value) => {
        return value === "";
      }).length === 0;
    const validMessage =
      Object.values(error.message).filter((value) => {
        return value === "";
      }).length === 0;
    return validInfo || validMessage;
  };

  const handleAutoAddress = async () => {
    if (!form.info.zipcode) return;

    const result = await axios
      .get(
        `https://apis.postcode-jp.com/api/v3/postcodes?apikey=[O8KWhVnnSYBpMmYgK28IBYOdBAP25YvivftDvdx]&postcode=${sanitazeZipCode(
          form.info.zipcode
        )}`
      )
      .then((res) => res.data)
      .catch(() =>
        alert("その郵便番号は存在しません。正しい郵便番号を入力してください")
      );

    const preKey = "prefecture";
    const cityKey = "city";
    const restKey = "restAddress";

    setForm({
      info: {
        ...form.info,
        [preKey]: result.data[0].pref,
        [cityKey]: result.data[0].city,
        [restKey]: result.data[0].town,
      },
    });
  };

  const onSubmit = () => {
    handleSaveData({
      name: form.info.name,
      email: form.info.email,
      password: form.info.password,
      confirmPassword: form.info.confirmPassword,
      telephone: form.info.telephone,
      address: form.info.prefecture + form.info.city + form.info.restAddress,
      zipcode: form.info.zipcode,
    });
  };

  return (
    <div>
      <TextInput
        fullwidth={true}
        label={"ユーザー名"}
        name={"name"}
        multiline={false}
        required={true}
        rows={1}
        value={form.info.name}
        helperText={error.message.name && error.message.name}
        type={"text"}
        onChange={(e) => handleChangeForm(e)}
        autoComplete={"off"}
        FormHelperTextProps={{ className: classes.errorColor }}
      />
      <TextInput
        fullwidth={true}
        label={"メールアドレス"}
        multiline={false}
        name={"email"}
        required={true}
        rows={1}
        value={form.info.email}
        helperText={error.message.email && error.message.email}
        type={"email"}
        autoComplete={"off"}
        onChange={(e) => handleChangeForm(e)}
        FormHelperTextProps={{ className: classes.errorColor }}
      />
      <TextInput
        fullwidth={true}
        label={"郵便番号"}
        name={"zipcode"}
        multiline={false}
        required={true}
        rows={1}
        type={"text"}
        value={form.info.zipcode}
        helperText={error.message.zipcode && error.message.zipcode}
        onChange={(e) => handleChangeForm(e)}
        autoComplete={"off"}
        FormHelperTextProps={{ className: classes.errorColor }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => {
                  handleAutoAddress();
                }}
              >
                住所検索
              </Button>
            </InputAdornment>
          ),
        }}
      />
      <TextInput
        fullwidth={true}
        label={"住所（都道府県）"}
        multiline={false}
        name="prefecture"
        required={true}
        rows={1}
        value={form.info.prefecture}
        helperText={error.message.prefecture && error.message.prefecture}
        FormHelperTextProps={{ className: classes.errorColor }}
        type={"text"}
        autoComplete={"off"}
        onChange={(e) => handleChangeForm(e)}
      />
      <TextInput
        fullwidth={true}
        label={"住所（市区町村）"}
        multiline={false}
        name="city"
        required={true}
        rows={1}
        value={form.info.city}
        helperText={error.message.city && error.message.city}
        FormHelperTextProps={{ className: classes.errorColor }}
        autoComplete={"off"}
        type={"text"}
        onChange={(e) => handleChangeForm(e)}
      />
      <TextInput
        fullwidth={true}
        label={"住所（その他住所）"}
        multiline={false}
        name="restAddress"
        required={true}
        rows={1}
        value={form.info.restAddress}
        helperText={error.message.restAddress && error.message.restAddress}
        FormHelperTextProps={{ className: classes.errorColor }}
        autoComplete={"off"}
        type={"text"}
        onChange={(e) => handleChangeForm(e)}
      />
      <TextInput
        fullwidth={true}
        label={"電話番号（ハイフンなし）"}
        multiline={false}
        name={"telephone"}
        required={true}
        rows={1}
        value={form.info.telephone}
        helperText={error.message.telephone && error.message.telephone}
        FormHelperTextProps={{ className: classes.errorColor }}
        autoComplete={"off"}
        type={"text"}
        onChange={(e) => handleChangeForm(e)}
      />
      <TextInput
        fullwidth={true}
        label={"パスワード"}
        name="password"
        multiline={false}
        required={true}
        rows={1}
        value={form.info.password}
        helperText={error.message.password && error.message.password}
        FormHelperTextProps={{ className: classes.errorColor }}
        autoComplete={"off"}
        type={"password"}
        onChange={(e) => handleChangeForm(e)}
      />
      <TextInput
        fullwidth={true}
        label={"確認パスワード"}
        name={"confirmPassword"}
        multiline={false}
        required={true}
        rows={1}
        value={form.info.confirmPassword}
        helperText={
          error.message.confirmPassword && error.message.confirmPassword
        }
        FormHelperTextProps={{ className: classes.errorColor }}
        autoComplete={"off"}
        type={"password"}
        onChange={(e) => handleChangeForm(e)}
      />
      <div className={classes.space} />
      <div className={classes.mainButton}>
        <Button
          className={classes.buttonStyle}
          type="submit"
          disabled={!canSubmit()}
          onClick={() => onSubmit()}
          variant="outlined"
          fullWidth
        >
          アカウントを登録する
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
