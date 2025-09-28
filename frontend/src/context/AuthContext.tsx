import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

type User = { email: string } | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const email = localStorage.getItem("email");
    return email ? { email } : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email && !user) {
      setUser({ email });
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const res = await API.post("/api/auth/login", { email, password });
      console.log(res.data.message);
        // toast.success(res.data.message)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);
      setUser({ email });
    } catch (error: any) {
        toast.error(error.response.data.message || error.message)
        console.log(error);

      console.log("Login failed:", error.response.data.message || error.message);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
        const res = await API.post("/api/auth/register", { email, password });
        console.log(res.data.message);
        // toast.success(res.data.message)
        await login(email, password);
      
    } catch (error: any) {
        toast.error(error.response.data.message)
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    toast.success("Logged Out")
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
