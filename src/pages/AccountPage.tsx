import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, Settings, Key, LogOut } from 'lucide-react';

const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    department: '',
    position: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (type: string) => {
    // Handle notification toggle logic
    console.log(`Toggled ${type} notifications`);
  };

  const handleSave = () => {
    // Handle save logic
    console.log('Saving profile changes:', formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Account Settings</h1>
        <p>Manage your profile and preferences</p>
      </PageHeader>

      <AccountGrid>
        <ProfileSection>
          <h2>Profile Information</h2>
          <AvatarSection>
            <Avatar>
              <User size={40} />
            </Avatar>
            <div>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
              <p>{user?.role}</p>
            </div>
          </AvatarSection>

          <FormGroup>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <FormGroup>
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </FormGroup>

          <ButtonGroup>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
                <Button secondary onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            )}
          </ButtonGroup>

          <LogoutSection>
            <Button danger onClick={handleLogout}>
              <LogOut size={16} />
              Log Out
            </Button>
          </LogoutSection>
        </ProfileSection>

        <SettingsSection>
          <h2>Preferences</h2>
          
          <SettingsGroup>
            <h3>Notifications</h3>
            <ToggleGroup>
              <Toggle>
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={() => handleNotificationToggle('email')}
                />
                <span>Email Notifications</span>
              </Toggle>
              <Toggle>
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={() => handleNotificationToggle('sms')}
                />
                <span>SMS Notifications</span>
              </Toggle>
              <Toggle>
                <input
                  type="checkbox"
                  onChange={() => handleNotificationToggle('push')}
                />
                <span>Push Notifications</span>
              </Toggle>
            </ToggleGroup>
          </SettingsGroup>

          <SettingsGroup>
            <h3>Security</h3>
            <Button secondary>
              <Key size={16} />
              Change Password
            </Button>
          </SettingsGroup>
        </SettingsSection>
      </AccountGrid>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1rem;
  }
`;

const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSection = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 24px;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 24px;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: 2px;
  }
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  
  label {
    display: block;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    font-size: 0.875rem;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const LogoutSection = styled.div`
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--glass-border);
`;

const SettingsSection = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 24px;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 24px;
  }
`;

const SettingsGroup = styled.div`
  margin-bottom: 32px;
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 16px;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Toggle = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    accent-color: var(--primary-color);
  }
  
  span {
    color: var(--text-primary);
    font-size: 0.875rem;
  }
`;

const Button = styled.button<{ secondary?: boolean; danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.danger ? `
    background: #dc2626;
    color: white;
    
    &:hover {
      background: #b91c1c;
    }
  ` : props.secondary ? `
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--glass-border);
    
    &:hover {
      background: var(--bg-tertiary);
    }
  ` : `
    background: var(--primary-color);
    color: white;
    
    &:hover {
      opacity: 0.9;
    }
  `}
`;

export default AccountPage; 