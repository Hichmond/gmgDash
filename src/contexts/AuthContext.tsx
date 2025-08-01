import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, UserRole, AuthState, ModuleAccess, Module } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  getModuleAccess: (module: Module) => ModuleAccess;
  hasAccess: (module: Module, permission: 'view' | 'edit' | 'delete' | 'create') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Role-based permissions matrix
const rolePermissions: Record<UserRole, Record<Module, ModuleAccess>> = {
  'GMG Admin': {
    'Dashboard': { module: 'Dashboard', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Employees': { module: 'Employees', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Incident Reporting': { module: 'Incident Reporting', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Documents': { module: 'Documents', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Toolbox Talks': { module: 'Toolbox Talks', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Training & Certification': { module: 'Training & Certification', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Notifications': { module: 'Notifications', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Account': { module: 'Account', canView: true, canEdit: true, canDelete: false, canCreate: false },
    'JHA': { module: 'JHA', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Support': { module: 'Support', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Equipment Inspection': { module: 'Equipment Inspection', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Site Assessment': { module: 'Site Assessment', canView: true, canEdit: true, canDelete: true, canCreate: true },
    'Messaging': { module: 'Messaging', canView: true, canEdit: true, canDelete: true, canCreate: true },
  },
  'Compliance Coordinator': {
    'Dashboard': { module: 'Dashboard', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Employees': { module: 'Employees', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Incident Reporting': { module: 'Incident Reporting', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Documents': { module: 'Documents', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Toolbox Talks': { module: 'Toolbox Talks', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Training & Certification': { module: 'Training & Certification', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Notifications': { module: 'Notifications', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Account': { module: 'Account', canView: true, canEdit: true, canDelete: false, canCreate: false },
    'JHA': { module: 'JHA', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Support': { module: 'Support', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Equipment Inspection': { module: 'Equipment Inspection', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Site Assessment': { module: 'Site Assessment', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Messaging': { module: 'Messaging', canView: true, canEdit: false, canDelete: false, canCreate: false },
  },
  'Area Manager': {
    'Dashboard': { module: 'Dashboard', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Employees': { module: 'Employees', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Incident Reporting': { module: 'Incident Reporting', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Documents': { module: 'Documents', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Toolbox Talks': { module: 'Toolbox Talks', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Training & Certification': { module: 'Training & Certification', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Notifications': { module: 'Notifications', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Account': { module: 'Account', canView: true, canEdit: true, canDelete: false, canCreate: false },
    'JHA': { module: 'JHA', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Support': { module: 'Support', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Equipment Inspection': { module: 'Equipment Inspection', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Site Assessment': { module: 'Site Assessment', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Messaging': { module: 'Messaging', canView: true, canEdit: false, canDelete: false, canCreate: false },
  },
  'Site Manager': {
    'Dashboard': { module: 'Dashboard', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Employees': { module: 'Employees', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Incident Reporting': { module: 'Incident Reporting', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Documents': { module: 'Documents', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Toolbox Talks': { module: 'Toolbox Talks', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Training & Certification': { module: 'Training & Certification', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Notifications': { module: 'Notifications', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Account': { module: 'Account', canView: true, canEdit: true, canDelete: false, canCreate: false },
    'JHA': { module: 'JHA', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Support': { module: 'Support', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Equipment Inspection': { module: 'Equipment Inspection', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Site Assessment': { module: 'Site Assessment', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Messaging': { module: 'Messaging', canView: true, canEdit: false, canDelete: false, canCreate: false },
  },
  'Employee (Field Tech)': {
    'Dashboard': { module: 'Dashboard', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Employees': { module: 'Employees', canView: false, canEdit: false, canDelete: false, canCreate: false },
    'Incident Reporting': { module: 'Incident Reporting', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Documents': { module: 'Documents', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Toolbox Talks': { module: 'Toolbox Talks', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Training & Certification': { module: 'Training & Certification', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Notifications': { module: 'Notifications', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Account': { module: 'Account', canView: true, canEdit: true, canDelete: false, canCreate: false },
    'JHA': { module: 'JHA', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Support': { module: 'Support', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Equipment Inspection': { module: 'Equipment Inspection', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Site Assessment': { module: 'Site Assessment', canView: true, canEdit: true, canDelete: false, canCreate: true },
    'Messaging': { module: 'Messaging', canView: true, canEdit: false, canDelete: false, canCreate: false },
  },
  'Client': {
    'Dashboard': { module: 'Dashboard', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Employees': { module: 'Employees', canView: false, canEdit: false, canDelete: false, canCreate: false },
    'Incident Reporting': { module: 'Incident Reporting', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Documents': { module: 'Documents', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Toolbox Talks': { module: 'Toolbox Talks', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Training & Certification': { module: 'Training & Certification', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Notifications': { module: 'Notifications', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Account': { module: 'Account', canView: true, canEdit: true, canDelete: false, canCreate: false },
    'JHA': { module: 'JHA', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Support': { module: 'Support', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Equipment Inspection': { module: 'Equipment Inspection', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Site Assessment': { module: 'Site Assessment', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Messaging': { module: 'Messaging', canView: true, canEdit: false, canDelete: false, canCreate: false },
  },
  'Auditor': {
    'Dashboard': { module: 'Dashboard', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Employees': { module: 'Employees', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Incident Reporting': { module: 'Incident Reporting', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Documents': { module: 'Documents', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Toolbox Talks': { module: 'Toolbox Talks', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Training & Certification': { module: 'Training & Certification', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Notifications': { module: 'Notifications', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Account': { module: 'Account', canView: true, canEdit: true, canDelete: false, canCreate: false },
    'JHA': { module: 'JHA', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Support': { module: 'Support', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Equipment Inspection': { module: 'Equipment Inspection', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Site Assessment': { module: 'Site Assessment', canView: true, canEdit: false, canDelete: false, canCreate: false },
    'Messaging': { module: 'Messaging', canView: true, canEdit: false, canDelete: false, canCreate: false },
  },
};

type AuthAction = 
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SWITCH_ROLE'; payload: UserRole };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false, 
        error: null 
      };
    case 'LOGIN_FAILURE':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        isLoading: false, 
        error: action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        isLoading: false, 
        error: null 
      };
    case 'SWITCH_ROLE':
      if (state.user) {
        return {
          ...state,
          user: { ...state.user, role: action.payload }
        };
      }
      return state;
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: {
    id: '1',
    email: 'demo@gmg.com',
    name: 'John Smith',
    role: 'GMG Admin',
  },
  isAuthenticated: true,
  isLoading: false,
  error: null,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo login - in real app, this would validate credentials
    if (email && password) {
      const demoUser: User = {
        id: '1',
        email,
        name: 'Demo User',
        role: 'GMG Admin',
      };
      dispatch({ type: 'LOGIN_SUCCESS', payload: demoUser });
      // Set localStorage flag
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', 'GMG Admin');
      // Redirect to dashboard after successful login
      window.location.href = '/dashboard';
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    // Clear localStorage flags
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    // Redirect to login page after logout
    window.location.href = '/login';
  };

  const switchRole = (role: UserRole) => {
    dispatch({ type: 'SWITCH_ROLE', payload: role });
  };

  const getModuleAccess = (module: Module): ModuleAccess => {
    if (!state.user) {
      return {
        module,
        canView: false,
        canEdit: false,
        canDelete: false,
        canCreate: false,
      };
    }
    
    // Handle module name mappings for navigation items
    const moduleMapping: Record<string, Module> = {
      'Dashboard': 'Dashboard',
      'Employees': 'Employees',
      'Incident Reporting': 'Incident Reporting',
      'Documents': 'Documents',
      'Toolbox Talks': 'Toolbox Talks',
      'Training & Certification': 'Training & Certification',
      'Notifications': 'Notifications',
      'JHA (Job Hazard Analyses)': 'JHA',
      'Support': 'Support',
      'Equipment Inspection': 'Equipment Inspection',
      'Site Assessment': 'Site Assessment',
      'Messaging': 'Messaging',
    };
    
    const mappedModule = moduleMapping[module] || module;
    const access = rolePermissions[state.user.role][mappedModule];
    
    // Return default access if module not found
    if (!access) {
      return {
        module,
        canView: false,
        canEdit: false,
        canDelete: false,
        canCreate: false,
      };
    }
    
    return access;
  };

  const hasAccess = (module: Module, permission: 'view' | 'edit' | 'delete' | 'create'): boolean => {
    try {
      const access = getModuleAccess(module);
      switch (permission) {
        case 'view': return access.canView;
        case 'edit': return access.canEdit;
        case 'delete': return access.canDelete;
        case 'create': return access.canCreate;
        default: return false;
      }
    } catch (error) {
      console.warn(`Error checking access for module ${module}:`, error);
      return false;
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    switchRole,
    getModuleAccess,
    hasAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 