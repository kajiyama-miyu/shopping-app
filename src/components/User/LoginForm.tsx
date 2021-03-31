import React, { useState } from "react";
import { TextInput } from "../CommonParts/index";
import { Login } from "../../reducks/user/type";
import { SignInValidation } from "../../service/validation";
import {
  makeStyles,
  createStyles,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export type Props = {
  handleSaveData: (login: Login) => void;
};

type Form = {
  info: Login;
};

type Error = {
  message: Login;
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

const LoginForm: React.FC<Props> = (props) => {
  const { handleSaveData } = props;
  const classes = useStyles();

  const [form, setForm] = useState<Form>({
      info: {
        email: "",
        password: "",
      },
    }),
    [error, setError] = useState<Error>({
      message: {
        email: "",
        password: "",
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
        [key]: SignInValidation(key, value),
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

  const onSubmit = () => {
    handleSaveData({
      email: form.info.email,
      password: form.info.password,
    });
  };

  return (
    <div>
      <TextInput
        fullwidth={true}
        label={"メールアドレス"}
        name={"email"}
        multiline={false}
        required={true}
        rows={1}
        value={form.info.email}
        onChange={(e) => handleChangeForm(e)}
        autoComplete={"off"}
        helperText={error.message.email && error.message.email}
        FormHelperTextProps={{ className: classes.errorColor }}
        type={"text"}
      />
      <TextInput
        fullwidth={true}
        label={"パスワード"}
        multiline={false}
        name={"password"}
        required={true}
        rows={1}
        value={form.info.password}
        helperText={error.message.password && error.message.password}
        type={"password"}
        onChange={(e) => handleChangeForm(e)}
        autoComplete={"off"}
        FormHelperTextProps={{ className: classes.errorColor }}
      />
      <div className={classes.space} />
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Typography component="p" variant="inherit">
            アカウントの登録がまだの方は<Link to="/signup">こちら</Link>
          </Typography>
        </Grid>
      </Grid>
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
          ログインする
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
