import React, { createContext, useEffect, useState } from "react";
import { Login } from "../reducks/user/type";
import { useDispatch } from "react-redux";
import { signIn, signOut } from "../reducks/user/operations";

type AuthContextProps = {
  token: string | null;
  login: (login: Login) => void;
  logout: () => void;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext = createContext<AuthContextProps>({
  token: "",
  login: () => {},
  logout: () => {},
  setToken: () => "",
});

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useDispatch();

  const login = (login: Login) => {
    dispatch(signIn(login));
  };

  const logout = () => {
    dispatch(signOut(localStorage.getItem("token")!));
    setToken(null);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [setToken]);

  return (
    <AuthContext.Provider
      value={{ login: login, logout: logout, token, setToken: setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
