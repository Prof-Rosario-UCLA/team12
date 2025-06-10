import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = '/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const { data } = await axios.get<User>(`${API_BASE_URL}/auth/me`);
          setUser(data);
        } catch (error) {
          console.error('Failed to load user from token', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, []);

  const login = async (username: string, password: string) => {
    // console.log('[AuthContext] login function called with:', username);
    try {
      // console.log('[AuthContext] Attempting axios.post to /api/auth/login');
      const response = await axios.post<{ _id: string; username: string; token: string }>(
        `${API_BASE_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      // console.log('[AuthContext] axios.post successful, response data:', response.data);
      
      const { token, ...userData } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData as User);
      // console.log('[AuthContext] setUser called with:', userData);
    } catch (error: any) {
      // console.error('[AuthContext] Error in login function:', error);
      // console.error('[AuthContext] Error response data:', error.response?.data);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await axios.post<{ _id: string; username: string; token: string }>(
        `${API_BASE_URL}/auth/register`,
        {
          username,
          password,
        }
      );
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    // axios.post(`${API_BASE_URL}/auth/logout`).catch(err => console.error('Logout API call failed', err));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
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