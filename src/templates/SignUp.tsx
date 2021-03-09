import React, { useState } from "react";
import { PrimaryButton } from "../components/CommonParts/index";
import { UserForm } from "../components/User/index";
import { User } from "../reducks/user/type";
import { useDispatch } from "react-redux";
import { signUp } from "../reducks/user/operations";

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
  const [user, setUser] = useState<User>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    address: "",
    zipCode: "",
  });

  const dispatch = useDispatch();

  const handleSaveData = () => {
    dispatch(signUp(user));
  };

  return (
    <div style={styles.formStyle}>
      <h2 style={styles.title}>アカウント登録</h2>
      <div style={styles.space} />
      <UserForm setSignUpUser={setUser} />
      <div style={styles.space} />
      <div style={styles.button}>
        <PrimaryButton
          label={"アカウントを登録する"}
          onClick={() => handleSaveData()}
        />
      </div>
    </div>
  );
};

export default SignUp;
