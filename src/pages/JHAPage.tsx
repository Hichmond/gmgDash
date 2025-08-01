import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  X, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Shield,
  Target,
  Zap,
  Users,
  Calendar,
  MapPin,
  AlertCircle,
  Clipboard,
  Settings,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SearchAndFilter from '../components/SearchAndFilter';

// Styled Components
const PageContainer = styled.div`
  padding: 24px;
  width: 100%;
  overflow-x: hidden;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const HeaderContent = styled.div`
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    margin-bottom: 8px;
  }
  
  p {
    color: white;
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${props => props.$variant === 'primary' ? `
    background: var(--primary-color);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  ` : `
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--glass-border);
    
    &:hover {
      background: var(--bg-tertiary);
      border-color: var(--primary-color);
    }
  `}
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-md);
  
  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    
    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    
      .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
  }
  }
  
  .stat-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .stat-change {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8rem;
    margin-top: 8px;
    
    &.positive {
      color: #059669;
    }
    
    &.negative {
      color: #dc2626;
    }
  }
`;

const JHATable = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 120px;
  gap: 16px;
  padding: 16px 24px;
  background: #f8fafc;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 120px;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  
  ${props => {
    switch (props.$status) {
      case 'active':
        return 'background: #d1fae5; color: #065f46;';
      case 'pending':
        return 'background: #fef3c7; color: #92400e;';
      case 'expired':
        return 'background: #fee2e2; color: #991b1b;';
      case 'draft':
        return 'background: #e0e7ff; color: #3730a3;';
      default:
        return 'background: #f3f4f6; color: #374151;';
    }
  }}
`;

const ActionButtonsCell = styled.div`
  display: flex;
  gap: 8px;
  
  button {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    &.view {
      background: #dbeafe;
      color: #1d4ed8;
      
      &:hover {
        background: #bfdbfe;
      }
    }
    
    &.edit {
      background: #fef3c7;
      color: #d97706;
      
      &:hover {
        background: #fde68a;
      }
    }
    
    &.delete {
      background: #fee2e2;
      color: #dc2626;
      
      &:hover {
        background: #fecaca;
      }
    }
  }
`;

// Modal Components
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
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 0;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0;
  margin-bottom: 24px;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    color: #6b7280;
    
    &:hover {
      background: #f3f4f6;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #374151;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
  margin-top: 24px;
`;

// Mock Data
const mockJHAs = [
  {
    id: 'JHA-001',
    title: 'Electrical Panel Maintenance',
    jobType: 'Maintenance',
    riskLevel: 'High',
    status: 'active',
    lastReview: '2024-01-15',
    nextReview: '2024-04-15',
    assignedTo: 'John Smith'
  },
  {
    id: 'JHA-002',
    title: 'Confined Space Entry',
    jobType: 'Operations',
    riskLevel: 'Critical',
    status: 'pending',
    lastReview: '2024-01-10',
    nextReview: '2024-03-10',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 'JHA-003',
    title: 'Heavy Equipment Operation',
    jobType: 'Operations',
    riskLevel: 'Medium',
    status: 'active',
    lastReview: '2024-01-20',
    nextReview: '2024-04-20',
    assignedTo: 'Mike Davis'
  },
  {
    id: 'JHA-004',
    title: 'Chemical Handling',
    jobType: 'Laboratory',
    riskLevel: 'High',
    status: 'expired',
    lastReview: '2023-12-01',
    nextReview: '2024-03-01',
    assignedTo: 'Lisa Wilson'
  },
  {
    id: 'JHA-005',
    title: 'Working at Heights',
    jobType: 'Construction',
    riskLevel: 'Critical',
    status: 'draft',
    lastReview: '2024-01-05',
    nextReview: '2024-04-05',
    assignedTo: 'Tom Brown'
  }
];

const JHAPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    status: '',
    riskLevel: '',
    jobType: ''
  });

  const handleCreateJHA = () => {
    setActiveModal('create-jha');
    setFormData({});
  };

  const handleViewJHA = (jhaId: string) => {
    setActiveModal('view-jha');
    const jha = mockJHAs.find(j => j.id === jhaId);
    setFormData(jha || {});
  };

  const handleEditJHA = (jhaId: string) => {
    setActiveModal('edit-jha');
    const jha = mockJHAs.find(j => j.id === jhaId);
    setFormData(jha || {});
  };

  const handleDeleteJHA = (jhaId: string) => {
    setActiveModal('delete-jha');
    setFormData({ id: jhaId });
  };

  const closeModal = () => {
    setActiveModal(null);
    setFormData({});
  };

  const handleSubmit = (actionType: string) => {
    console.log(`${actionType} submitted:`, formData);
    closeModal();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // Filter JHAs based on search and filter criteria
  const filteredJHAs = mockJHAs.filter(jha => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || (
      jha.title.toLowerCase().includes(query) ||
      jha.jobType.toLowerCase().includes(query) ||
      jha.assignedTo.toLowerCase().includes(query)
    );

    // Filter criteria
    const matchesStatus = !filterCriteria.status || 
      jha.status.toLowerCase() === filterCriteria.status.toLowerCase();
    
    const matchesRiskLevel = !filterCriteria.riskLevel || 
      jha.riskLevel.toLowerCase() === filterCriteria.riskLevel.toLowerCase();
    
    const matchesJobType = !filterCriteria.jobType || 
      jha.jobType.toLowerCase() === filterCriteria.jobType.toLowerCase();

    return matchesSearch && matchesStatus && matchesRiskLevel && matchesJobType;
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    setFilterCriteria(filters);
  };

  const handleSuggestionClick = (jha: any) => {
    setSearchQuery(jha.title);
  };

  const getIcon = (jha: any) => {
    return <Clipboard size={16} color="var(--text-secondary)" />;
  };

  const getTitle = (jha: any) => jha.title;
  const getDetails = (jha: any) => `${jha.jobType} • ${jha.riskLevel} • ${jha.assignedTo}`;

  const renderModal = () => {
    if (!activeModal) return null;

    const modalConfig = {
      'create-jha': {
        title: 'Create New JHA',
        fields: [
          { name: 'title', label: 'JHA Title', type: 'text' },
          { name: 'jobType', label: 'Job Type', type: 'select', options: ['Maintenance', 'Operations', 'Construction', 'Laboratory', 'Administrative'] },
          { name: 'description', label: 'Job Description', type: 'textarea' },
          { name: 'location', label: 'Work Location', type: 'text' },
          { name: 'assignedTo', label: 'Assigned To', type: 'text' },
          { name: 'riskLevel', label: 'Initial Risk Level', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] }
        ]
      },
      'edit-jha': {
        title: 'Edit JHA',
        fields: [
          { name: 'title', label: 'JHA Title', type: 'text' },
          { name: 'jobType', label: 'Job Type', type: 'select', options: ['Maintenance', 'Operations', 'Construction', 'Laboratory', 'Administrative'] },
          { name: 'description', label: 'Job Description', type: 'textarea' },
          { name: 'location', label: 'Work Location', type: 'text' },
          { name: 'assignedTo', label: 'Assigned To', type: 'text' },
          { name: 'riskLevel', label: 'Risk Level', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] }
        ]
      },
      'delete-jha': {
        title: 'Delete JHA',
        fields: []
      }
    };

    const config = modalConfig[activeModal as keyof typeof modalConfig];
    if (!config) return null;

    if (activeModal === 'delete-jha') {
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
                <h3>Delete JHA</h3>
                <button className="close-button" onClick={closeModal}>
                  <X size={20} />
                </button>
              </ModalHeader>
              
              <div style={{ padding: '0 24px 24px' }}>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Are you sure you want to delete this JHA? This action cannot be undone.
                </p>
                
                <ButtonGroup>
                  <Button onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button $variant="primary" onClick={() => handleSubmit('Delete JHA')}>
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </ModalContent>
          </ModalOverlay>
        </AnimatePresence>
      );
    }

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
              <div style={{ padding: '0 24px' }}>
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
              </div>
              
              <ButtonGroup>
                <Button type="button" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" $variant="primary">
                  {activeModal === 'create-jha' ? 'Create' : 'Save Changes'}
                </Button>
              </ButtonGroup>
            </form>
          </ModalContent>
        </ModalOverlay>
      </AnimatePresence>
    );
  };

  const stats = [
    {
      label: 'Total JHAs',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: <Clipboard size={20} />,
      color: '#667eea'
    },
    {
      label: 'Active JHAs',
      value: '18',
      change: '+8%',
      changeType: 'positive',
      icon: <CheckCircle size={20} />,
      color: '#10b981'
    },
    {
      label: 'Pending Review',
      value: '4',
      change: '-2',
      changeType: 'negative',
      icon: <Clock size={20} />,
      color: '#f59e0b'
    },
    {
      label: 'High Risk JHAs',
      value: '6',
      change: '+1',
      changeType: 'positive',
      icon: <AlertTriangle size={20} />,
      color: '#ef4444'
    }
  ];

  return (
    <PageContainer>
      <PageHeader>
        <HeaderContent>
          <h1>Job Hazard Analysis (JHA)</h1>
          <p>Identify, assess, and control workplace hazards through systematic analysis</p>
        </HeaderContent>
        <ActionButtons>
          <Button onClick={handleCreateJHA}>
            <Plus size={16} />
            Create JHA
          </Button>
          <Button>
            <Upload size={16} />
            Import
          </Button>
          <Button>
            <Download size={16} />
            Export
          </Button>
        </ActionButtons>
      </PageHeader>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <div className="stat-header">
              <div className="stat-icon" style={{ background: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-value">{stat.value}</div>
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-change ${stat.changeType}`}>
              {stat.change}
            </div>
          </StatCard>
        ))}
      </StatsGrid>

      <div style={{ marginBottom: '24px' }}>
        <SearchAndFilter
          data={mockJHAs}
          searchFields={['title', 'jobType', 'assignedTo']}
          filterFields={[
            { name: 'status', label: 'Status', type: 'select', options: ['Active', 'Pending', 'Expired', 'Draft'] },
            { name: 'riskLevel', label: 'Risk Level', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
            { name: 'jobType', label: 'Job Type', type: 'select', options: ['Maintenance', 'Operations', 'Construction', 'Laboratory', 'Administrative'] }
          ]}
          placeholder="Search JHAs by title, job type, or assigned personnel..."
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onSuggestionClick={handleSuggestionClick}
          getIcon={getIcon}
          getTitle={getTitle}
          getDetails={getDetails}
          searchQuery={searchQuery}
          filterCriteria={filterCriteria}
          modalTitle="Filter JHAs"
        />
      </div>

      <JHATable>
        <TableHeader>
          <div>JHA Title</div>
          <div>Job Type</div>
          <div>Risk Level</div>
          <div>Status</div>
          <div>Next Review</div>
          <div>Actions</div>
        </TableHeader>
        
        {(searchQuery || filterCriteria.status || filterCriteria.riskLevel || filterCriteria.jobType ? filteredJHAs : mockJHAs).map((jha, index) => (
          <TableRow
            key={jha.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <div style={{ fontWeight: 500, color: '#1f2937' }}>{jha.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>ID: {jha.id}</div>
            </div>
            <div>{jha.jobType}</div>
            <div>
              <StatusBadge $status={jha.riskLevel.toLowerCase()}>
                {jha.riskLevel}
              </StatusBadge>
            </div>
            <div>
              <StatusBadge $status={jha.status}>
                {jha.status === 'active' && <CheckCircle size={12} />}
                {jha.status === 'pending' && <Clock size={12} />}
                {jha.status === 'expired' && <AlertTriangle size={12} />}
                {jha.status === 'draft' && <FileText size={12} />}
                {jha.status.charAt(0).toUpperCase() + jha.status.slice(1)}
              </StatusBadge>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              {jha.nextReview}
            </div>
            <ActionButtonsCell>
              <button className="view" onClick={() => handleViewJHA(jha.id)}>
                <Eye size={14} />
              </button>
              <button className="edit" onClick={() => handleEditJHA(jha.id)}>
                <Edit size={14} />
              </button>
              <button className="delete" onClick={() => handleDeleteJHA(jha.id)}>
                <Trash2 size={14} />
              </button>
            </ActionButtonsCell>
          </TableRow>
        ))}
      </JHATable>

      {renderModal()}
    </PageContainer>
  );
};

export default JHAPage; 