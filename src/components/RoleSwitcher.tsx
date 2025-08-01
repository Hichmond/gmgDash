import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

const RoleSwitcherContainer = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--glass-border);
  padding: 16px 24px;
  margin-bottom: 24px;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  
  .logo {
    width: 32px;
    height: 32px;
    background: var(--primary-color);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
  
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }
  
  .subtitle {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-left: 8px;
  }
`;

const RoleButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 16px;
`;

const RoleButton = styled(motion.button)<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => props.$isActive ? 'transparent' : 'rgba(255, 255, 255, 0.2)'};
  background: ${props => props.$isActive ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$isActive ? 'white' : 'var(--text-primary)'};
  font-size: 0.9rem;
  font-weight: ${props => props.$isActive ? '600' : '500'};
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
  min-width: 120px;
  text-align: center;
  
  &:hover {
    background: ${props => props.$isActive ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.15)'};
    transform: translateY(-1px);
  }
`;

const DashboardSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
  }
`;

const userRoles: UserRole[] = [
  'GMG Admin',
  'Compliance Coordinator',
  'Area Manager',
  'Site Manager',
  'Employee (Field Tech)',
  'Client',
  'Auditor',
];

const RoleSwitcher: React.FC = () => {
  const { user, switchRole } = useAuth();

  if (!user) return null;

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    // Show a brief notification about the role change
    console.log(`Switched to role: ${newRole}`);
  };

  return (
    <RoleSwitcherContainer>
      <Header>
        <div className="logo">
          <Shield size={20} />
        </div>
        <h1>GMG EHS Dashboard</h1>
        <span className="subtitle">Environmental, Health & Safety Management System</span>
      </Header>

      <RoleButtonsContainer>
        {userRoles.map((role) => (
          <RoleButton
            key={role}
            $isActive={user.role === role}
            onClick={() => handleRoleSwitch(role)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {role}
          </RoleButton>
        ))}
      </RoleButtonsContainer>

      <DashboardSection>
        <h2>Dashboard</h2>
        <div className="status-dot"></div>
        <RoleButton
          $isActive={true}
          style={{ marginLeft: 'auto' }}
        >
          {user.role}
        </RoleButton>
      </DashboardSection>
    </RoleSwitcherContainer>
  );
};

export default RoleSwitcher; 