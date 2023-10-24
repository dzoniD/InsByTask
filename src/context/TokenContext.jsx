"use client";
import { getToken } from "@/components/utils/fetchHelper";
import { createContext, useContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    getToken().then((response) => setToken(response));
  }, []);

  return (
    <TokenContext.Provider value={{ token }}>{children}</TokenContext.Provider>
  );
};

const useTokenContext = () => useContext(TokenContext);

export default useTokenContext;
