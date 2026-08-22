import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_USER, DEFAULT_ADDRESSES } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('food_app_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('food_app_addresses');
    return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
  });

  useEffect(() => {
    localStorage.setItem('food_app_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('food_app_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const login = (emailOrPhone, password) => {
    if (emailOrPhone.toLowerCase() === 'thanushmasika@gmail.com' || emailOrPhone === '8328247714') {
      setUser(DEFAULT_USER);
      return { success: true, user: DEFAULT_USER };
    }
    const updated = {
      ...user,
      email: emailOrPhone.includes('@') ? emailOrPhone : user.email,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : user.phone
    };
    setUser(updated);
    return { success: true, user: updated };
  };

  const signup = (userData) => {
    const newUser = {
      ...DEFAULT_USER,
      ...userData,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      role: "customer"
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addAddress = (newAddr) => {
    const addr = {
      id: `addr-${Date.now()}`,
      ...newAddr,
      isDefault: addresses.length === 0
    };
    setAddresses(prev => [addr, ...prev]);
    return addr;
  };

  const updateAddress = (id, updates) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAddress = (id) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <AuthContext.Provider value={{
      user,
      addresses,
      login,
      signup,
      updateProfile,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
