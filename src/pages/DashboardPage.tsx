import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  FileText,
  Calendar,
  Activity,
  CheckCircle,
  Clock,
  X,
  Plus,
  Upload,
  UserPlus,
  GraduationCap,
  BarChart3,
  Target,
  Shield,
  Zap,
  ArrowUpRight,
  Eye,
  Download,
  BookOpen,
  Award,
  Zap as Lightning
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
  padding: 0 24px;
`;

const Header = styled.div`
  margin-bottom: 32px;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
  }
  
  p {
    color: white;
    font-size: 1.1rem;
  }
`;

const AttentionBanners = styled.div`
  margin-bottom: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const AttentionBanner = styled.div<{ $type: 'warning' | 'danger' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 12px;
  background: ${props => props.$type === 'warning' ? '#fef3c7' : '#fee2e2'};
  border-left: 4px solid ${props => props.$type === 'warning' ? '#f59e0b' : '#ef4444'};
  
  .banner-icon {
    color: ${props => props.$type === 'warning' ? '#f59e0b' : '#ef4444'};
    flex-shrink: 0;
  }
  
  .banner-content {
    flex: 1;
    
    .banner-title {
      font-weight: 600;
      color: ${props => props.$type === 'warning' ? '#92400e' : '#991b1b'};
      font-size: 0.95rem;
      margin-bottom: 2px;
    }
    
    .banner-description {
      color: ${props => props.$type === 'warning' ? '#a16207' : '#dc2626'};
      font-size: 0.9rem;
    }
  }
  
  .banner-close {
    background: none;
    border: none;
    color: ${props => props.$type === 'warning' ? '#f59e0b' : '#ef4444'};
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.$type === 'warning' ? '#fde68a' : '#fecaca'};
    }
  }
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
`;

const ModuleCard = styled(motion.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-lg);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  

  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.2);
  }
`;

const ModuleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ModuleIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color};
  color: white;
`;

const StatusBadge = styled.div<{ $status: 'compliant' | 'overdue' | 'due-soon' | 'open' }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  
  ${props => {
    switch (props.$status) {
      case 'compliant':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'overdue':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      case 'due-soon':
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      case 'open':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      default:
        return '';
    }
  }}
`;

const ModuleValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const ModuleLabel = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 16px;
`;

const ModuleFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percentage: number }>`
  height: 100%;
  background: var(--warning-color);
  border-radius: 3px;
  width: ${props => props.$percentage}%;
  transition: width 0.3s ease;
`;

const RecentActivitySection = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-lg);
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActivityItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  background: var(--bg-tertiary);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--bg-secondary);
    transform: translateX(4px);
  }
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: white;
  font-size: 14px;
`;

const ActivityContent = styled.div`
  flex: 1;
  
  .activity-title {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.9rem;
    margin-bottom: 2px;
  }
  
  .activity-subtitle {
    color: var(--text-secondary);
    font-size: 0.8rem;
  }
`;

const ActivityStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActivityBadge = styled.div<{ $status: 'investigating' | 'overdue' | 'complete' | 'approved' }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  
  ${props => {
    switch (props.$status) {
      case 'investigating':
        return `
          background: #fef3c7;
          color: #92400e;
        `;
      case 'overdue':
        return `
          background: #fee2e2;
          color: #991b1b;
        `;
      case 'complete':
        return `
          background: #dcfce7;
          color: #166534;
        `;
      case 'approved':
        return `
          background: #dbeafe;
          color: #1e40af;
        `;
      default:
        return '';
    }
  }}
`;

const QuickActionsSection = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow-lg);
  margin-bottom: 32px;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const QuickActionCard = styled(motion.div)`
  background: var(--bg-secondary);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #cbd5e1;
  }
`;

const QuickActionIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-color);
  color: white;
  margin: 0 auto 12px;
`;

const QuickActionLabel = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9rem;
`;

// Modal Components (keeping existing functionality)
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  
  .close-button {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    
    &:hover {
      background: #f3f4f6;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 8px;
    font-size: 0.9rem;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    font-size: 0.9rem;
    transition: border-color 0.2s;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  
  ${props => props.$variant === 'primary' ? `
    background: var(--primary-color);
    color: white;
    
    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  ` : `
    background: #f3f4f6;
    color: #374151;
    
    &:hover {
      background: #e5e7eb;
    }
  `}
`;

const DashboardPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const attentionBanners = [
    {
      type: 'warning' as const,
      icon: <AlertTriangle size={20} />,
      title: 'Attention Required',
      description: '5 certifications expiring this week in your area!',
    },
    {
      type: 'danger' as const,
      icon: <AlertTriangle size={20} />,
      title: 'Attention Required',
      description: '8 overdue tasks require immediate attention!',
    },
  ];

  const modules = [
    {
      id: 'assessment-score',
      icon: <Target size={24} />,
      iconColor: 'var(--primary-color)',
      value: '85%',
      label: 'Assessment Score',
      status: 'compliant' as const,
      statusText: 'Compliant',
      hasProgress: false,
    },
    {
      id: 'outstanding-corrective-actions',
      icon: <AlertTriangle size={24} />,
      iconColor: 'var(--warning-color)',
      value: '12',
      label: 'Outstanding Corrective Actions',
      status: 'overdue' as const,
      statusText: 'Overdue',
      hasProgress: false,
    },
    {
      id: 'training-completion',
      icon: <BookOpen size={24} />,
      iconColor: 'var(--primary-color)',
      value: '78%',
      label: 'Training Completion',
      status: 'due-soon' as const,
      statusText: 'Due Soon',
      hasProgress: true,
      progressPercentage: 78,
    },
    {
      id: 'open-incidents',
      icon: <Shield size={24} />,
      iconColor: 'var(--success-color)',
      value: '3',
      label: 'Open Incidents',
      status: 'open' as const,
      statusText: 'Open',
      hasProgress: false,
    },
    {
      id: 'expiring-certifications',
      icon: <Award size={24} />,
      iconColor: 'var(--warning-color)',
      value: '5',
      label: 'Expiring Certifications',
      status: 'due-soon' as const,
      statusText: 'Due Soon',
      hasProgress: false,
    },
    {
      id: 'overdue-tasks',
      icon: <Lightning size={24} />,
      iconColor: 'var(--danger-color)',
      value: '8',
      label: 'Overdue Tasks',
      status: 'overdue' as const,
      statusText: 'Overdue',
      hasProgress: false,
    },
  ];

  const recentActivities = [
    {
      icon: <AlertTriangle size={16} />,
      title: 'Near Miss Report - Loading Dock',
      subtitle: 'Incident Reporting',
      status: 'investigating' as const,
      time: '2 hours ago',
    },
    {
      icon: <Calendar size={16} />,
      title: 'Weekly Toolbox Talk Due',
      subtitle: 'Training',
      status: 'overdue' as const,
      time: '1 day ago',
    },
    {
      icon: <CheckCircle size={16} />,
      title: 'Monthly Safety Inspection',
      subtitle: 'Inspections',
      status: 'complete' as const,
      time: '3 days ago',
    },
    {
      icon: <FileText size={16} />,
      title: 'SDS Sheet Updated - Chemical A',
      subtitle: 'Document Management',
      status: 'approved' as const,
      time: '1 week ago',
    },
  ];

  const quickActions = [
    {
      id: 'report-incident',
      icon: <AlertTriangle size={20} />,
      label: 'Report Incident',
      permission: 'Incident Reporting',
      action: 'create',
    },
    {
      id: 'upload-document',
      icon: <FileText size={20} />,
      label: 'Upload Document',
      permission: 'Documents',
      action: 'create',
    },
    {
      id: 'add-employee',
      icon: <Users size={20} />,
      label: 'Add Employee',
      permission: 'Employees',
      action: 'create',
    },
    {
      id: 'schedule-training',
      icon: <Calendar size={20} />,
      label: 'Schedule Training',
      permission: 'Training & Certification',
      action: 'create',
    },
  ];

  const handleQuickAction = (action: any) => {
    // Check if user has permission for this action
    if (action.permission && action.action) {
      const hasPermission = hasAccess(action.permission as any, action.action);
      if (!hasPermission) {
        alert(`You don't have permission to ${action.label.toLowerCase()}.`);
        return;
      }
    }
    
    // Open the appropriate modal
    setActiveModal(action.id);
    setFormData({});
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModal(`module-${moduleId}`);
    setFormData({});
  };

  const closeModal = () => {
    setActiveModal(null);
    setFormData({});
  };

  const handleSubmit = (actionType: string) => {
    // Handle form submission based on action type
    console.log(`Submitting ${actionType}:`, formData);
    
    // Here you would typically send data to your backend
    alert(`${actionType} submitted successfully!`);
    
    closeModal();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const renderModal = () => {
    if (!activeModal) return null;

    // Handle module analysis modals
    if (activeModal.startsWith('module-')) {
      const moduleId = activeModal.replace('module-', '');
      const module = modules.find(m => m.id === moduleId);
      
      if (module) {
        return (
          <AnimatePresence>
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <ModalContent
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ModalHeader>
                  <h3>{module.label} - Detailed Analysis</h3>
                  <button className="close-button" onClick={closeModal}>
                    <X size={20} />
                  </button>
                </ModalHeader>
                
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '16px',
                    background: module.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    color: 'white'
                  }}>
                    {module.icon}
                  </div>
                  <h4 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#1f2937' }}>
                    {module.value}
                  </h4>
                  <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                    {module.label}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    Detailed analysis and breakdown coming soon...
                  </p>
                </div>
              </ModalContent>
            </ModalOverlay>
          </AnimatePresence>
        );
      }
    }

    // Handle quick action modals
    const modalConfig = {
      'report-incident': {
        title: 'Report Incident',
        fields: [
          { name: 'title', label: 'Incident Title', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'severity', label: 'Severity Level', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
          { name: 'location', label: 'Location', type: 'text' },
        ]
      },
      'upload-document': {
        title: 'Upload Document',
        fields: [
          { name: 'title', label: 'Document Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'select', options: ['Safety', 'Training', 'Compliance', 'Equipment'] },
          { name: 'file', label: 'File', type: 'file' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ]
      },
      'add-employee': {
        title: 'Add Employee',
        fields: [
          { name: 'firstName', label: 'First Name', type: 'text' },
          { name: 'lastName', label: 'Last Name', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'department', label: 'Department', type: 'select', options: ['Safety', 'Operations', 'Management', 'Training'] },
          { name: 'position', label: 'Position', type: 'text' },
        ]
      },
      'schedule-training': {
        title: 'Schedule Training',
        fields: [
          { name: 'title', label: 'Training Title', type: 'text' },
          { name: 'type', label: 'Training Type', type: 'select', options: ['Safety', 'Compliance', 'Equipment', 'General'] },
          { name: 'date', label: 'Date', type: 'date' },
          { name: 'duration', label: 'Duration (hours)', type: 'number' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ]
      }
    };

    const config = modalConfig[activeModal as keyof typeof modalConfig];
    if (!config) return null;

    return (
      <AnimatePresence>
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <ModalContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <h3>{config.title}</h3>
              <button className="close-button" onClick={closeModal}>
                <X size={20} />
              </button>
            </ModalHeader>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(config.title);
            }}>
              {config.fields.map((field) => (
                <FormGroup key={field.name}>
                  <label>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option: string) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'file' ? (
                    <input
                      type="file"
                      onChange={(e) => handleInputChange(field.name, e.target.files?.[0])}
                      required
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      required
                    />
                  )}
                </FormGroup>
              ))}
              
              <ButtonGroup>
                <Button type="button" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" $variant="primary">
                  Submit
                </Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </ModalOverlay>
      </AnimatePresence>
    );
  };

  return (
    <DashboardContainer>
      <Header>
        <h1>Welcome back, {user?.name || 'User'}!</h1>
        <p>Here's what's happening with your EHS dashboard today.</p>
      </Header>

      <AttentionBanners>
        {attentionBanners.map((banner, index) => (
          <AttentionBanner key={index} $type={banner.type}>
            <div className="banner-icon">
              {banner.icon}
            </div>
            <div className="banner-content">
              <div className="banner-title">{banner.title}</div>
              <div className="banner-description">{banner.description}</div>
            </div>
            <button className="banner-close">
              <X size={16} />
            </button>
          </AttentionBanner>
        ))}
      </AttentionBanners>

      <QuickActionsSection>
        <SectionTitle>
          <Zap size={20} />
          Quick Actions
        </SectionTitle>
        <QuickActionsGrid>
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleQuickAction(action)}
            >
              <QuickActionIcon>
                {action.icon}
              </QuickActionIcon>
              <QuickActionLabel>{action.label}</QuickActionLabel>
            </QuickActionCard>
          ))}
        </QuickActionsGrid>
      </QuickActionsSection>

      <ModulesGrid>
        {modules.map((module, index) => (
          <ModuleCard
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleModuleClick(module.id)}
          >
            <ModuleHeader>
              <ModuleIcon $color={module.iconColor}>
                {module.icon}
              </ModuleIcon>
              <StatusBadge $status={module.status}>
                {module.status === 'compliant' && <CheckCircle size={12} />}
                {module.status === 'overdue' && <AlertTriangle size={12} />}
                {module.status === 'due-soon' && <Clock size={12} />}
                {module.status === 'open' && <AlertTriangle size={12} />}
                {module.statusText}
              </StatusBadge>
            </ModuleHeader>
            <ModuleValue>{module.value}</ModuleValue>
            <ModuleLabel>{module.label}</ModuleLabel>
            {module.hasProgress && (
              <ProgressBar>
                <ProgressFill $percentage={module.progressPercentage || 0} />
              </ProgressBar>
            )}
            <ModuleFooter>
              <span>Click for detailed analysis</span>
              <ArrowUpRight size={16} />
            </ModuleFooter>
          </ModuleCard>
        ))}
      </ModulesGrid>

      <RecentActivitySection>
        <SectionTitle>
          <Activity size={20} />
          Recent Activity
        </SectionTitle>
        <p style={{ color: '#6b7280', marginBottom: '20px', fontSize: '0.9rem' }}>
          Recent site activities and tasks
        </p>
        <ActivityList>
          {recentActivities.map((activity, index) => (
            <ActivityItem
              key={activity.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <ActivityIcon>
                {activity.icon}
              </ActivityIcon>
              <ActivityContent>
                <div className="activity-title">{activity.title}</div>
                <div className="activity-subtitle">{activity.subtitle}</div>
              </ActivityContent>
              <ActivityStatus>
                <ActivityBadge $status={activity.status}>
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </ActivityBadge>
                <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                  {activity.time}
                </span>
              </ActivityStatus>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivitySection>

      {renderModal()}
    </DashboardContainer>
  );
};

export default DashboardPage; 
export default DashboardPage; 