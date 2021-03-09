import React, { useState } from "react";
import { PrimaryButton } from "../components/CommonParts/index";
import { LoginForm } from "../components/User/index";
import { Login } from "../reducks/user/type";
import { useDispatch } from "react-redux";
import { signIn } from "../reducks/user/operations";

const styles: { [key: string]: React.CSSProperties } = {
  formStyle: {
    margin: "0rem auto",
    maxWidth: "400px",
    padding: "1rem",
    height: "auto",
    width: "calc(100% - 2rem)",
  },
  title: {
    color: "#33CCFF",
    fontSize: "1.563rem",
    margin: "0 auto 1rem auto",
    textAlign: "center",
  },
  space: {
    height: "48px",
  },
  button: {
    margin: "0px auto",
    textAlign: "center",
  },
};

const SignUp: React.FC = () => {
  const [loginUser, setLoginUser] = useState<Login>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(signIn(loginUser));
  };

  return (
    <div style={styles.formStyle}>
      <h2 style={styles.title}>ログイン</h2>
      <div style={styles.space} />
      <LoginForm setLoginUser={setLoginUser} />
      <div style={styles.space} />
      <div style={styles.button}>
        <PrimaryButton label={"ログインする"} onClick={() => handleLogin()} />
      </div>
    </div>
  );
};

export default SignUp;
