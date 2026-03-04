import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' | 'SIGNUP_START' }
  | { type: 'LOGIN_SUCCESS' | 'SIGNUP_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' | 'SIGNUP_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'SIGNUP_START':
      return { ...state, isLoading: true };

    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
    case 'LOGOUT':
      return { user: null, token: null, isAuthenticated: false, isLoading: false };

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    axios
      .get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user: res.data, token },
        });
      })
      .catch(() => {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGIN_FAILURE' });
      });
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: res.data.user, token } });
      return true;
    } catch {
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    dispatch({ type: 'SIGNUP_START' });
    try {
      const res = await axios.post('/api/auth/register', { name, email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      dispatch({ type: 'SIGNUP_SUCCESS', payload: { user: res.data.user, token } });
      return true;
    } catch {
      dispatch({ type: 'SIGNUP_FAILURE' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
