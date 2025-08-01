export type UserRole = 
  | 'GMG Admin'
  | 'Compliance Coordinator'
  | 'Area Manager'
  | 'Site Manager'
  | 'Employee (Field Tech)'
  | 'Client'
  | 'Auditor';

export type Module = 
  | 'Dashboard'
  | 'Employees'
  | 'Incident Reporting'
  | 'Documents'
  | 'Toolbox Talks'
  | 'Training & Certification'
  | 'Notifications'
  | 'Account'
  | 'JHA'
  | 'Support'
  | 'Equipment Inspection'
  | 'Site Assessment'
  | 'Messaging';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface ModuleAccess {
  module: Module;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ModuleConfig {
  name: Module;
  icon: string;
  path: string;
  description: string;
  isImplemented: boolean;
}

export interface SidebarItem {
  module: Module;
  icon: string;
  path: string;
  isActive: boolean;
  isImplemented: boolean;
} 