
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'child' | 'parent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  age?: number;
  parentId?: string;
  avatar?: string;
  streak: number;
  totalSavings: number;
  level: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User> & { email: string; password: string }) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('growthApp_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call - In real app, this would be an actual authentication
    const mockUsers: Record<string, User> = {
      'child@demo.com': {
        id: '1',
        name: 'Alex Garden',
        email: 'child@demo.com',
        role: 'child',
        age: 10,
        avatar: '🌱',
        streak: 7,
        totalSavings: 45.50,
        level: 3,
        badges: ['First Deposit', 'Week Warrior', 'Plant Parent']
      },
      'parent@demo.com': {
        id: '2',
        name: 'Sarah Garden',
        email: 'parent@demo.com',
        role: 'parent',
        avatar: '🌻',
        streak: 0,
        totalSavings: 0,
        level: 1,
        badges: []
      },
      'admin@demo.com': {
        id: '3',
        name: 'Growth Admin',
        email: 'admin@demo.com',
        role: 'admin',
        avatar: '🌳',
        streak: 0,
        totalSavings: 0,
        level: 1,
        badges: []
      }
    };

    const foundUser = mockUsers[email];
    if (foundUser && foundUser.role === role) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('growthApp_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { email: string; password: string }): Promise<boolean> => {
    // Simulate registration
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email,
      role: userData.role || 'child',
      age: userData.age,
      avatar: userData.avatar || '🌱',
      streak: 0,
      totalSavings: 0,
      level: 1,
      badges: []
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('growthApp_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('growthApp_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('growthApp_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      updateUser,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};
