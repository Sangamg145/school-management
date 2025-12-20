"use client";

import React, { createContext, useState, useCallback, useEffect } from "react";

export type UserRole = "super_admin" | "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isHydrated: boolean;
  login: (email: string, password: string, role: UserRole) => void;
  signup: (userData: Omit<User, "id">) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("schoolDashboardUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("schoolDashboardUser");
      }
    }
    setIsHydrated(true);
  }, []);

  const login = useCallback((email: string, password: string, role: UserRole) => {
    // Mock login - In production, this would call a backend API
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: email.split("@")[0],
      email,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    setUser(newUser);
    localStorage.setItem("schoolDashboardUser", JSON.stringify(newUser));
  }, []);

  const signup = useCallback((userData: Omit<User, "id">) => {
    // Mock signup - In production, this would call a backend API
    const newUser: User = {
      ...userData,
      id: `user_${Date.now()}`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
    };
    setUser(newUser);
    localStorage.setItem("schoolDashboardUser", JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("schoolDashboardUser");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isHydrated, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
