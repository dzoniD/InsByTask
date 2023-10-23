"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { uuid } from "uuidv4";

export const TokenContext = createContext();

async function getToken() {
  const uuids = uuid();

  const response = await fetch(" https://dev-mrp.insby.tech/api/v2/init/app", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `hQtwpolwKTjUkNAkZGeSiOkhp2OP8UA6TAPyA7bOWLFXTPPJOMzQUOOhLg43uXoFIuA5T4yKySJnHZhhVNWBqfNLcaKBfrAx:lolci3wdjsHDhFsQOnubYma5Zl33BPwE4NA5wftU9qxJnmIkP3ju8qw0F6ECjF4kvmp3SwNuLZrEMQezkFHqOMYjCBVJJzxv`,
          "utf8"
        ).toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid: `${uuids}`, uuidOS: "Windows" }),
  });

  const data = await response.json();
  return data.data.token;
}

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
