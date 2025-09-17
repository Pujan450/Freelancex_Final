// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";
import newRequest from "../utils/newRequest"; // Your API utility

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (credentials) => {
    try {
      const res = await newRequest.post("/auth/login", credentials);
      setCurrentUser(res.data);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await newRequest.post("/auth/logout");
      setCurrentUser(null);
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};