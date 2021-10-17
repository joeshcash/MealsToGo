import React, { useState, createContext } from "react";

import {
  authLogout,
  loginRequest,
  onAuthStateChanged,
  registerRequest,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  onAuthStateChanged((usr) => {
    if (usr) setUser(user);

    setIsLoading(false);
  });

  const onLogin = (email, password) => {
    setError(null);
    setIsLoading(true);

    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, confirmPassword) => {
    setError(null);

    if (password !== confirmPassword) {
      setError("Error: Passwords do not match");

      return;
    }

    setIsLoading(true);

    registerRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    setUser(null);
    authLogout();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated: !!user,
        onLogin,
        onRegister,
        onLogout,
        setError,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
