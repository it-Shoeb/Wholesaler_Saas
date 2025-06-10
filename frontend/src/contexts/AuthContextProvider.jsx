import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [User, setUser] = useState(null);
  const [IsAuthenticate, setIsAuthenticate] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await api.get("/authentication/check");
        setUser(response.data.user);
        setIsAuthenticate(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticate(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (User) => {
    try {
      const response = await api.post("/authentication/login", { ...User });
      console.log("User:", User);
      console.log("response:", response);
      // setUser(User);
      setIsAuthenticate(true);
      return response;
    } catch (error) {
      console.log('authcontext error:', error)
      setUser(null);
      setIsAuthenticate(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await api.post("/authentication/logout");
      setUser(null);
      setIsAuthenticate(false);
      return response;
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        User,
        IsAuthenticate,
        Loading,
        login,
        logout,
        setUser,
        setIsAuthenticate,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const UseAuth = () => {
  const context = useContext(AuthContext);

  // if (context.IsAuthenticate === undefined || context.User === null) {
  //   throw new Error("useAuth must be used within an AuthContextProvider");
  // }
  return context;
};

export { AuthContextProvider, AuthContext, UseAuth };
