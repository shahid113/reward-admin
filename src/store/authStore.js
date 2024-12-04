import { create } from 'zustand';
import axios from 'axios';


const baseURL="https://aaaminer-backend.onrender.com/api/v1/admin/"

const loginAPI = async (adminCode) => {
  try {
    const response = await axios.post(`${baseURL}/login`, { 
      adminCode 
    });
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    return null;
  }
};

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  
  login: async (adminCode) => {
    try {
      const response = await loginAPI(adminCode);
      
      if (response && response.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        
        // Update store state
        set({ 
          user: response.user, 
          token: response.token 
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  },

  logout: () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Reset store state
    set({ user: null, token: null });
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  }
}));