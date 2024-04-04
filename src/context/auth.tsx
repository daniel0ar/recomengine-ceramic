import { createContext, useEffect, useState } from 'react';

interface AuthState {
  user: User | null;
}

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

interface User {
  id: string;
  name: string;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
  }

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  }
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>  
  )
}