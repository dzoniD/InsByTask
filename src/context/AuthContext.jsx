"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ authenticated: true, token, user });
    } else {
      setUser({ authenticated: false });
    }
  }, []);

  const login = (token, data) => {
    localStorage.setItem("token", token);
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
      })
    );
    setUser({ authenticated: true, token, data });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({ authenticated: false });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
