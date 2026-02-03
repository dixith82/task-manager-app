'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      // Mock user for demo
      setUser({
        id: '1',
        email: 'demo@test.com',
        name: 'Demo User'
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login for demo
    localStorage.setItem('token', 'mock-jwt-token');
    setUser({
      id: '1',
      email,
      name: 'Demo User'
    });
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration for demo
    localStorage.setItem('token', 'mock-jwt-token');
    setUser({
      id: Date.now().toString(),
      email,
      name
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}