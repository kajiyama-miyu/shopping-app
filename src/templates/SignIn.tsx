import React, { useContext } from "react";
import { LoginForm } from "../components/User/index";
import { AuthContext } from "../auth/AuthProvider";

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

const SignIn: React.FC = () => {
  const { login } = useContext(AuthContext);

  return (
    <>
      <div style={styles.formStyle}>
        <h2 style={styles.title}>ログイン</h2>
        <div style={styles.space} />
        <LoginForm handleSaveData={login} />
      </div>
    </>
  );
};

export default SignIn;
