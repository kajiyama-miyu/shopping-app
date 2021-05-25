import React from "react";
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
  const dispatch = useDispatch();

  const handleSaveData = (user: User) => {
    dispatch(signUp(user));
  };

  return (
    <>
      <div style={styles.formStyle}>
        <h2 style={styles.title}>アカウント登録</h2>
        <div style={styles.space} />
        <UserForm handleSaveData={handleSaveData} />
      </div>
    </>
  );
};

export default SignUp;
