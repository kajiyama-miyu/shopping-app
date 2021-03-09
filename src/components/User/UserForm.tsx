import React, { useState, useCallback, useEffect } from "react";
import { TextInput } from "../CommonParts/index";
import { User } from "../../reducks/user/type";

export type Props = {
  setSignUpUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserForm: React.FC<Props> = (props) => {
  const { setSignUpUser } = props;

  const [userName, setUserName] = useState(""),
    [email, setEmail] = useState(""),
    [zipCode, setZipCode] = useState(""),
    [address1, setAddress1] = useState(""),
    [address2, setAddress2] = useState(""),
    [password, setPassword] = useState(""),
    [telephone, setTelephone] = useState(""),
    [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setSignUpUser({
      userName: userName,
      email: email,
      zipCode: zipCode,
      address: address1 + address2,
      password: password,
      telephone: telephone,
      confirmPassword: confirmPassword,
    });
  }, [
    userName,
    email,
    zipCode,
    address1,
    address2,
    password,
    telephone,
    confirmPassword,
    setSignUpUser,
  ]);

  const inputUserName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserName(event.target.value);
    },
    [setUserName]
  );
  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputZipCode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setZipCode(event.target.value);
    },
    [setZipCode]
  );
  const inputAddress1 = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress1(event.target.value);
    },
    [setAddress1]
  );
  const inputAddress2 = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress2(event.target.value);
    },
    [setAddress2]
  );
  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputTelephone = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTelephone(event.target.value);
    },
    [setTelephone]
  );
  const inputConfirmPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div>
      <TextInput
        fullwidth={true}
        label={"ユーザー名"}
        multiline={false}
        required={true}
        rows={1}
        value={userName}
        type={"text"}
        onChange={inputUserName}
      />
      <TextInput
        fullwidth={true}
        label={"メールアドレス"}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={"email"}
        onChange={inputEmail}
      />
      <TextInput
        fullwidth={true}
        label={"郵便番号"}
        multiline={false}
        required={true}
        rows={1}
        value={zipCode}
        type={"text"}
        onChange={inputZipCode}
      />
      <TextInput
        fullwidth={true}
        label={"住所（都道府県）"}
        multiline={false}
        required={true}
        rows={1}
        value={address1}
        type={"text"}
        onChange={inputAddress1}
      />
      <TextInput
        fullwidth={true}
        label={"住所（市区町村、建物名）"}
        multiline={false}
        required={true}
        rows={1}
        value={address2}
        type={"text"}
        onChange={inputAddress2}
      />
      <TextInput
        fullwidth={true}
        label={"電話番号"}
        multiline={false}
        required={true}
        rows={1}
        value={telephone}
        type={"text"}
        onChange={inputTelephone}
      />
      <TextInput
        fullwidth={true}
        label={"パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={"password"}
        onChange={inputPassword}
      />
      <TextInput
        fullwidth={true}
        label={"確認パスワード"}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={"password"}
        onChange={inputConfirmPassword}
      />
    </div>
  );
};

export default UserForm;
