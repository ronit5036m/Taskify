import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axiosInstance.get("/api/current-user", {
        headers: { Authorization: token },
      });
      setUser(res.data.user.username);
      setIsLoggedIn(true);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // This runs on initial load
  useEffect(() => {
    fetchUser();
  }, []);

  // login handler
  const login = async (token) => {
    localStorage.setItem("token", token);
    await fetchUser();
  };

  // logout handler
  const logout = async () => {
    try {
      await axiosInstance.get("/logout");
    } catch {}
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
