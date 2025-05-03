import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define user type
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'freelancer' | 'client';
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  getUserRole: () => 'freelancer' | 'client' | null;
  checkUserPermission: (requiredRole?: 'freelancer' | 'client') => boolean;
}

// Define signup data type
interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  role: 'freelancer' | 'client';
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isAuthenticated: false,
  getUserRole: () => null,
  checkUserPermission: () => false,
});

// Create a hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    role: 'freelancer',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    role: 'client',
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on load
  useEffect(() => {
    const checkUserSession = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Validate parsed user has required fields
          if (
            parsedUser &&
            typeof parsedUser === 'object' &&
            'id' in parsedUser &&
            'firstName' in parsedUser &&
            'lastName' in parsedUser &&
            'email' in parsedUser &&
            'role' in parsedUser
          ) {
            setUser(parsedUser);
          } else {
            // Invalid user data in localStorage, clear it
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Get user role helper function
  const getUserRole = (): 'freelancer' | 'client' | null => {
    return user ? user.role : null;
  };

  // Check if user has permission (for role-based access)
  const checkUserPermission = (requiredRole?: 'freelancer' | 'client'): boolean => {
    if (!isAuthenticated) return false;
    if (!requiredRole) return true; // No specific role required
    return user?.role === requiredRole;
  };

  // Login function
  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new Error('Invalid email format');
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (in a real app, this would be a server request)
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        // In a real app, you'd verify the password here
        // For now, just check password is not empty (we're not actually checking it)
        if (password.trim().length === 0) {
          throw new Error('Password cannot be empty');
        }
        
        setUser(foundUser);
        // Store user in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(foundUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData: SignupData) => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'role'] as const;
    for (const field of requiredFields) {
      if (!userData[field] || userData[field].trim() === '') {
        throw new Error(`${field} is required`);
      }
    }
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Validate password strength
    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    // Validate role is valid
    if (!['freelancer', 'client'].includes(userData.role)) {
      throw new Error('Invalid role selection');
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: `${Date.now().toString(36)}`, // Generate a unique ID
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: userData.email.toLowerCase().trim(),
        role: userData.role,
      };
      
      // In a real app, we would add the user to the database
      // For this demo, just set the current user
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Could also clear other app-specific data from localStorage if needed
  };

  // Determine if user is authenticated
  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated,
        getUserRole,
        checkUserPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 