import React, { useState, useCallback, useEffect } from "react";
import { TextInput } from "../CommonParts/index";
import { Login } from "../../reducks/user/type";

export type Props = {
  setLoginUser: React.Dispatch<React.SetStateAction<Login>>;
};

const LoginForm: React.FC<Props> = (props) => {
  const { setLoginUser } = props;

  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  useEffect(() => {
    setLoginUser({
      email: email,
      password: password,
    });
  }, [email, password, setLoginUser]);

  return (
    <div>
      <TextInput
        fullwidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"text"}
        onChange={inputEmail}
      />
      <TextInput
        fullwidth={true}
        label={"ユーザー名"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
    </div>
  );
};

export default LoginForm;
