import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: "MOIL-ENG-108",
  name: "Dr. A. K. Sharma",
  role: "Chief Mining Geologist & Operations Controller",
  organization: "MOIL Limited (Balaghat HQ)",
  clearance: "Level 4 - Command Clearance",
  avatar: "AK"
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('manganai_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const login = (userData) => {
    const activeUser = userData || DEFAULT_USER;
    setUser(activeUser);
    localStorage.setItem('manganai_user', JSON.stringify(activeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('manganai_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
