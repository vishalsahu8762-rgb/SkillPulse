import React, { createContext, useContext, useState, useEffect } from 'react';
import { signupApi, loginApi, getProfileApi, updateProfileApi, logoutApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('skillsync_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('skillsync_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('skillsync_token');
      if (storedToken) {
        try {
          const res = await getProfileApi();
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('skillsync_user', JSON.stringify(res.data));
          }
        } catch (err) {
          console.warn('Session verification failed, logging out:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginApi({ email, password });
    if (res.token && res.data) {
      setToken(res.token);
      setUser(res.data);
      localStorage.setItem('skillsync_token', res.token);
      localStorage.setItem('skillsync_user', JSON.stringify(res.data));
      return res.data;
    }
    throw new Error('Invalid login response');
  };

  const signup = async (userData) => {
    const res = await signupApi(userData);
    if (res.token && res.data) {
      setToken(res.token);
      setUser(res.data);
      localStorage.setItem('skillsync_token', res.token);
      localStorage.setItem('skillsync_user', JSON.stringify(res.data));
      return res.data;
    }
    throw new Error('Invalid signup response');
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      // Ignore network errors on logout
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('skillsync_token');
    localStorage.removeItem('skillsync_user');
  };

  const updateProfile = async (updatedData) => {
    const res = await updateProfileApi(updatedData);
    if (res.data) {
      setUser(res.data);
      localStorage.setItem('skillsync_user', JSON.stringify(res.data));
      return res.data;
    }
    throw new Error('Failed to update profile');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
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
