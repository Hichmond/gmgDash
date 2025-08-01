import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User,
  Home,
  Users,
  AlertCircle,
  FileText,
  MessageSquare,
  GraduationCap,
  Bell,
  Clipboard,
  HelpCircle,
  Settings,
  Building,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Module } from '../types';
import ThemeToggle from './ThemeToggle';

const SidebarContainer = styled(motion.div)<{ $isOpen: boolean }>`
  position: relative;
  height: 100vh;
  width: 280px;
  background: var(--bg-secondary);
  border-right: 1px solid var(--text-muted);
  box-shadow: 2px 0 8px rgba(0, 28, 41, 0.1);
  
  @media (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const SidebarContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid var(--text-muted);
  position: relative;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--bg-tertiary);
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  .user-details {
    flex: 1;
    
    .user-name {
      color: var(--text-primary);
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 2px;
    }
    
    .user-role {
      color: var(--text-secondary);
      font-size: 12px;
    }
  }
  
  .close-button {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    
    &:hover {
      background: #e9ecef;
    }
  }
`;

const Navigation = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
`;

const NavItem = styled(motion.button)<{ $isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  background: ${props => props.$isActive ? 'var(--primary-color)' : 'transparent'};
  border: none;
  color: ${props => props.$isActive ? 'white' : 'var(--text-primary)'};
  font-size: 14px;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    background: ${props => props.$isActive ? 'var(--primary-color)' : 'var(--bg-tertiary)'};
  }
  
  .icon-container {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => {
      if (props.$isActive) return 'rgba(255, 255, 255, 0.2)';
      // Fixed colors matching the reference image
      const colors = {
        'Dashboard': '#3b82f6',
        'Employees': '#10b981', 
        'Incident Reporting': '#ef4444',
        'Documents': '#8b5cf6',
        'Toolbox Talks': '#f59e0b',
        'Training & Certification': '#8b5cf6',
        'Notifications': '#06b6d4',
        'JHA (Job Hazard Analyses)': '#ec4899',
        'Support': '#6b7280',
        'Equipment Inspection': '#059669',
        'Site Assessment': '#3b82f6',
        'Messaging': '#3b82f6'
      };
      return colors[props.children?.toString().split(' ')[0] as keyof typeof colors] || '#3b82f6';
    }};
    color: white;
    transition: all 0.2s ease;
  }
`;

const MobileToggle = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 60;
  background: var(--bg-secondary);
  border: 1px solid var(--text-muted);
  border-radius: 8px;
  padding: 12px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 28, 41, 0.1);
  
  &:hover {
    background: var(--bg-tertiary);
  }
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 28, 41, 0.5);
  z-index: 40;
  
  @media (min-width: 768px) {
    display: none !important;
  }
`;

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentModule: Module;
}

const navigationItems = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Employees', icon: Users, path: '/employees' },
  { name: 'Incident Reporting', icon: AlertCircle, path: '/incident-reporting' },
  { name: 'Documents', icon: FileText, path: '/documents' },
  { name: 'Toolbox Talks', icon: MessageSquare, path: '/toolbox-talks' },
  { name: 'Training & Certification', icon: GraduationCap, path: '/training' },
  { name: 'Notifications', icon: Bell, path: '/notifications' },
  { name: 'JHA (Job Hazard Analyses)', icon: Clipboard, path: '/jha' },
  { name: 'Support', icon: HelpCircle, path: '/support' },
  { name: 'Equipment Inspection', icon: Settings, path: '/equipment-inspection' },
  { name: 'Site Assessment', icon: Building, path: '/site-assessment' },
  { name: 'Messaging', icon: MessageCircle, path: '/messaging' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, currentModule }) => {
  const { user, hasAccess } = useAuth();
  const navigate = useNavigate();

  // Always render the sidebar for debugging
  console.log('Sidebar rendering, user:', user, 'isOpen:', isOpen);

  return (
    <>
      <MobileToggle onClick={onToggle}>
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </MobileToggle>

      <AnimatePresence>
        {isOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      <SidebarContainer
        $isOpen={isOpen}
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <SidebarContent>
                  <Header>
          <UserInfo onClick={() => navigate('/account')}>
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-details">
              <div className="user-name">{user?.name || 'Demo User'}</div>
              <div className="user-role">{user?.role || 'Administrator'}</div>
            </div>
            <button className="close-button" onClick={onToggle} style={{ display: 'none' }}>
              <X size={16} />
            </button>
          </UserInfo>
          <ThemeToggle />
        </Header>

          <Navigation>
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = currentModule === item.name;
              
              // Check if user has access to this module
              const canView = hasAccess(item.name as any, 'view');
              
              // Don't render if user doesn't have access
              if (!canView) {
                return null;
              }
              
              return (
                <NavItem
                  key={item.name}
                  $isActive={isActive}
                  onClick={() => {
                    // Navigate to module
                    console.log(`Navigating to ${item.name}`);
                    navigate(item.path);
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="icon-container">
                    <IconComponent size={18} />
                  </div>
                  <span>{item.name}</span>
                </NavItem>
              );
            })}
          </Navigation>
        </SidebarContent>
      </SidebarContainer>
    </>
  );
};

export default Sidebar; 