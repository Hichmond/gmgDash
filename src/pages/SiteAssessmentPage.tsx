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
  Settings,
  MapPin,
  Zap,
  Users,
  Calendar,
  AlertCircle,
  Clipboard,
  BarChart3,
  Shield,
  Activity,
  TrendingUp,
  CalendarDays,
  AlertOctagon,
  Building,
  Target,
  Flag,
  Award,
  Clock as TimeIcon,
  CheckSquare,
  Square
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

const AssessmentTable = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 120px;
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
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 120px;
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
      case 'completed':
        return 'background: #d1fae5; color: #065f46;';
      case 'in-progress':
        return 'background: #fef3c7; color: #92400e;';
      case 'pending':
        return 'background: #dbeafe; color: #1d4ed8;';
      case 'overdue':
        return 'background: #fee2e2; color: #991b1b;';
      case 'compliant':
        return 'background: #d1fae5; color: #065f46;';
      case 'non-compliant':
        return 'background: #fee2e2; color: #991b1b;';
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
const mockAssessments = [
  {
    id: 'SA-001',
    title: 'Warehouse Safety Assessment',
    site: 'Main Warehouse',
    assessor: 'John Smith',
    status: 'completed',
    lastAssessment: '2024-01-15',
    nextAssessment: '2024-04-15',
    compliance: 'compliant',
    score: 85
  },
  {
    id: 'SA-002',
    title: 'Construction Site Safety Audit',
    site: 'Building A Construction',
    assessor: 'Sarah Johnson',
    status: 'in-progress',
    lastAssessment: '2024-01-10',
    nextAssessment: '2024-03-10',
    compliance: 'non-compliant',
    score: 62
  },
  {
    id: 'SA-003',
    title: 'Office Building Safety Review',
    site: 'Corporate Office',
    assessor: 'Mike Davis',
    status: 'completed',
    lastAssessment: '2024-01-20',
    nextAssessment: '2024-04-20',
    compliance: 'compliant',
    score: 92
  },
  {
    id: 'SA-004',
    title: 'Manufacturing Facility Assessment',
    site: 'Production Plant',
    assessor: 'Lisa Wilson',
    status: 'pending',
    lastAssessment: '2023-12-01',
    nextAssessment: '2024-03-01',
    compliance: 'non-compliant',
    score: 45
  },
  {
    id: 'SA-005',
    title: 'Laboratory Safety Audit',
    site: 'Research Lab',
    assessor: 'Tom Brown',
    status: 'overdue',
    lastAssessment: '2024-01-05',
    nextAssessment: '2024-02-05',
    compliance: 'non-compliant',
    score: 38
  }
];

const SiteAssessmentPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    status: '',
    compliance: '',
    site: ''
  });

  const handleCreateAssessment = () => {
    setActiveModal('create-assessment');
    setFormData({});
  };

  const handleViewAssessment = (assessmentId: string) => {
    setActiveModal('view-assessment');
    const assessment = mockAssessments.find(a => a.id === assessmentId);
    setFormData(assessment || {});
  };

  const handleEditAssessment = (assessmentId: string) => {
    setActiveModal('edit-assessment');
    const assessment = mockAssessments.find(a => a.id === assessmentId);
    setFormData(assessment || {});
  };

  const handleDeleteAssessment = (assessmentId: string) => {
    setActiveModal('delete-assessment');
    setFormData({ id: assessmentId });
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

  // Filter assessments based on search and filter criteria
  const filteredAssessments = mockAssessments.filter(assessment => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || (
      assessment.title.toLowerCase().includes(query) ||
      assessment.site.toLowerCase().includes(query) ||
      assessment.assessor.toLowerCase().includes(query)
    );

    // Filter criteria
    const matchesStatus = !filterCriteria.status || 
      assessment.status.toLowerCase() === filterCriteria.status.toLowerCase();
    
    const matchesCompliance = !filterCriteria.compliance || 
      assessment.compliance.toLowerCase() === filterCriteria.compliance.toLowerCase();
    
    const matchesSite = !filterCriteria.site || 
      assessment.site.toLowerCase() === filterCriteria.site.toLowerCase();

    return matchesSearch && matchesStatus && matchesCompliance && matchesSite;
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    setFilterCriteria(filters);
  };

  const handleSuggestionClick = (assessment: any) => {
    setSearchQuery(assessment.title);
  };

  const getIcon = (assessment: any) => {
    return <Building size={16} color="var(--text-secondary)" />;
  };

  const getTitle = (assessment: any) => assessment.title;
  const getDetails = (assessment: any) => `${assessment.site} • ${assessment.assessor} • Score: ${assessment.score}%`;

  const renderModal = () => {
    if (!activeModal) return null;

    const modalConfig = {
      'create-assessment': {
        title: 'Create New Site Assessment',
        fields: [
          { name: 'title', label: 'Assessment Title', type: 'text' },
          { name: 'site', label: 'Site Location', type: 'text' },
          { name: 'assessor', label: 'Assigned Assessor', type: 'text' },
          { name: 'assessmentType', label: 'Assessment Type', type: 'select', options: ['Safety Audit', 'Compliance Review', 'Risk Assessment', 'Environmental Assessment', 'Security Assessment'] },
          { name: 'scheduledDate', label: 'Scheduled Date', type: 'date' },
          { name: 'priority', label: 'Priority Level', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
          { name: 'description', label: 'Assessment Description', type: 'textarea' }
        ]
      },
      'edit-assessment': {
        title: 'Edit Site Assessment',
        fields: [
          { name: 'title', label: 'Assessment Title', type: 'text' },
          { name: 'site', label: 'Site Location', type: 'text' },
          { name: 'assessor', label: 'Assigned Assessor', type: 'text' },
          { name: 'status', label: 'Status', type: 'select', options: ['Pending', 'In Progress', 'Completed', 'Overdue'] },
          { name: 'compliance', label: 'Compliance Status', type: 'select', options: ['Compliant', 'Non-Compliant', 'Under Review'] },
          { name: 'score', label: 'Assessment Score', type: 'number' }
        ]
      },
      'delete-assessment': {
        title: 'Delete Assessment',
        fields: []
      }
    };

    const config = modalConfig[activeModal as keyof typeof modalConfig];
    if (!config) return null;

    if (activeModal === 'delete-assessment') {
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
                <h3>Delete Assessment</h3>
                <button className="close-button" onClick={closeModal}>
                  <X size={20} />
                </button>
              </ModalHeader>
              
              <div style={{ padding: '0 24px 24px' }}>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Are you sure you want to delete this assessment? This action cannot be undone.
                </p>
                
                <ButtonGroup>
                  <Button onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button $variant="primary" onClick={() => handleSubmit('Delete Assessment')}>
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
                  {activeModal === 'create-assessment' ? 'Create' : 'Save Changes'}
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
      label: 'Total Assessments',
      value: '32',
      change: '+8',
      changeType: 'positive',
      icon: <Building size={20} />,
      color: '#667eea'
    },
    {
      label: 'Completed',
      value: '24',
      change: '+5',
      changeType: 'positive',
      icon: <CheckCircle size={20} />,
      color: '#10b981'
    },
    {
      label: 'In Progress',
      value: '6',
      change: '+2',
      changeType: 'positive',
      icon: <Clock size={20} />,
      color: '#f59e0b'
    },
    {
      label: 'Overdue',
      value: '2',
      change: '-1',
      changeType: 'negative',
      icon: <AlertTriangle size={20} />,
      color: '#ef4444'
    }
  ];

  return (
    <PageContainer>
      <PageHeader>
        <HeaderContent>
          <h1>Site Assessment</h1>
          <p>Manage site safety assessments, audit workflows, and compliance tracking</p>
        </HeaderContent>
        <ActionButtons>
          <Button onClick={handleCreateAssessment}>
            <Plus size={16} />
            Create Assessment
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
          data={mockAssessments}
          searchFields={['title', 'site', 'assessor']}
          filterFields={[
            { name: 'status', label: 'Status', type: 'select', options: ['Completed', 'In Progress', 'Pending', 'Overdue'] },
            { name: 'compliance', label: 'Compliance', type: 'select', options: ['Compliant', 'Non-Compliant'] },
            { name: 'site', label: 'Site', type: 'select', options: ['Main Warehouse', 'Building A Construction', 'Corporate Office', 'Production Plant', 'Research Lab'] }
          ]}
          placeholder="Search assessments by title, site, or assessor..."
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onSuggestionClick={handleSuggestionClick}
          getIcon={getIcon}
          getTitle={getTitle}
          getDetails={getDetails}
          searchQuery={searchQuery}
          filterCriteria={filterCriteria}
          modalTitle="Filter Assessments"
        />
      </div>

      <AssessmentTable>
        <TableHeader>
          <div>Assessment Title</div>
          <div>Site</div>
          <div>Status</div>
          <div>Compliance</div>
          <div>Score</div>
          <div>Next Assessment</div>
          <div>Actions</div>
        </TableHeader>
        
        {(searchQuery || filterCriteria.status || filterCriteria.compliance || filterCriteria.site ? filteredAssessments : mockAssessments).map((assessment, index) => (
          <TableRow
            key={assessment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <div style={{ fontWeight: 500, color: '#1f2937' }}>{assessment.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>ID: {assessment.id}</div>
            </div>
            <div>{assessment.site}</div>
            <div>
              <StatusBadge $status={assessment.status}>
                {assessment.status === 'completed' && <CheckCircle size={12} />}
                {assessment.status === 'in-progress' && <Clock size={12} />}
                {assessment.status === 'pending' && <TimeIcon size={12} />}
                {assessment.status === 'overdue' && <AlertTriangle size={12} />}
                {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
              </StatusBadge>
            </div>
            <div>
              <StatusBadge $status={assessment.compliance}>
                {assessment.compliance === 'compliant' && <CheckCircle size={12} />}
                {assessment.compliance === 'non-compliant' && <AlertTriangle size={12} />}
                {assessment.compliance.charAt(0).toUpperCase() + assessment.compliance.slice(1)}
              </StatusBadge>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              {assessment.score}%
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              {assessment.nextAssessment}
            </div>
            <ActionButtonsCell>
              <button className="view" onClick={() => handleViewAssessment(assessment.id)}>
                <Eye size={14} />
              </button>
              <button className="edit" onClick={() => handleEditAssessment(assessment.id)}>
                <Edit size={14} />
              </button>
              <button className="delete" onClick={() => handleDeleteAssessment(assessment.id)}>
                <Trash2 size={14} />
              </button>
            </ActionButtonsCell>
          </TableRow>
        ))}
      </AssessmentTable>

      {renderModal()}
    </PageContainer>
  );
};

export default SiteAssessmentPage; 