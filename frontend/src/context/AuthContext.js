import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set axios default header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      // Don't logout automatically - allow guest mode
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });
      const { token: newToken, ...userData } = response.data;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        // Server responded with error
        return {
          success: false,
          message: error.response.data?.message || 'Registration failed',
        };
      } else if (error.request) {
        // Request was made but no response received
        return {
          success: false,
          message: 'لا يمكن الاتصال بالخادم. تأكد من أن الخادم يعمل على المنفذ 5000',
        };
      } else {
        // Something else happened
        return {
          success: false,
          message: error.message || 'Registration failed',
        };
      }
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });
      const { token: newToken, ...userData } = response.data;
      setToken(newToken);
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setUser(userData);
      await fetchUser(); // Fetch full user data including savedDuas and favoriteNames
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // Server responded with error
        return {
          success: false,
          message: error.response.data?.message || 'Login failed',
        };
      } else if (error.request) {
        // Request was made but no response received
        return {
          success: false,
          message: 'لا يمكن الاتصال بالخادم. تأكد من أن الخادم يعمل على المنفذ 5000',
        };
      } else {
        // Something else happened
        return {
          success: false,
          message: error.message || 'Login failed',
        };
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

