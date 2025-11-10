import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, RegisterData, LoginData } from '@/types';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getId } from '@/api/auth';
import { getUserInfo } from '@/api/account';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Перевірка токену при завантаженні
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const userId = await getId(token);
          const userData = await getUserInfo(userId);
          setUser(userData);
        } catch (error) {
          // Token invalid, clear it
          localStorage.removeItem('auth_token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (data: LoginData) => {
    try {
      const token = await apiLogin(data);
      if (!token) {
        throw new Error('Token not received');
      }
      const userId = await getId(token);
      const userData = await getUserInfo(userId);
      setUser(userData);
      toast.success('Успішний вхід!');
    } catch (error: any) {
      console.error('Login error in AuthContext:', error);
      const errorMessage = error?.message || error?.response?.data || 'Помилка входу';
      toast.error(errorMessage);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const token = await apiRegister(data);
      const userId = await getId(token);
      const userData = await getUserInfo(userId);
      setUser(userData);
      toast.success('Реєстрація успішна!');
    } catch (error: any) {
      toast.error(error.message || 'Помилка реєстрації');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      // Ignore errors
    } finally {
      setUser(null);
      toast.success('Ви вийшли з системи');
    }
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const userId = await getId(token);
        const userData = await getUserInfo(userId);
        setUser(userData);
      }
    } catch (error) {
      // Ignore errors
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

