import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  // token: string | null; // If you store JWT token here
}

interface AuthContextType extends AuthState {
  login: (userId: string /*, token: string */) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userId: null,
    // token: null,
  });

  const login = (userId: string /*, token: string */) => {
    setAuthState({ isLoggedIn: true, userId /*, token */ });
    // localStorage.setItem('authToken', token); // Example: persist token
  };

  const logout = () => {
    setAuthState({ isLoggedIn: false, userId: null /*, token: null */ });
    // localStorage.removeItem('authToken'); // Example: clear token
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 