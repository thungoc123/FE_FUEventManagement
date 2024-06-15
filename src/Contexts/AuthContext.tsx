// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    email: string;
    setEmailContext: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmailContext] = useState('');

  return (
    <AuthContext.Provider value={{email, setEmailContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
