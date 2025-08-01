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
  MessageCircle,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
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
  Square,
  User,
  Tag,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Paperclip,
  Smile,
  Frown,
  Meh
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

const TicketTable = styled.div`
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
      case 'open':
        return 'background: #dbeafe; color: #1d4ed8;';
      case 'in-progress':
        return 'background: #fef3c7; color: #92400e;';
      case 'resolved':
        return 'background: #d1fae5; color: #065f46;';
      case 'closed':
        return 'background: #f3f4f6; color: #374151;';
      case 'urgent':
        return 'background: #fee2e2; color: #991b1b;';
      case 'low':
        return 'background: #d1fae5; color: #065f46;';
      case 'medium':
        return 'background: #fef3c7; color: #92400e;';
      case 'high':
        return 'background: #fed7aa; color: #c2410c;';
      case 'critical':
        return 'background: #fee2e2; color: #991b1b;';
      default:
        return 'background: #f3f4f6; color: #374151;';
    }
  }}
`;

const PriorityBadge = styled.span<{ $priority: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  
  ${props => {
    switch (props.$priority) {
      case 'low':
        return 'background: #d1fae5; color: #065f46;';
      case 'medium':
        return 'background: #fef3c7; color: #92400e;';
      case 'high':
        return 'background: #fed7aa; color: #c2410c;';
      case 'critical':
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
const mockTickets = [
  {
    id: 'TKT-001',
    title: 'System Login Issue',
    category: 'Technical',
    priority: 'high',
    status: 'in-progress',
    assignedTo: 'Sarah Johnson',
    submittedBy: 'John Smith',
    submittedDate: '2024-01-15',
    lastUpdated: '2024-01-16',
    description: 'Unable to access the EHS dashboard system. Getting error message when trying to log in.'
  },
  {
    id: 'TKT-002',
    title: 'Report Generation Problem',
    category: 'Reports',
    priority: 'medium',
    status: 'open',
    assignedTo: 'Mike Davis',
    submittedBy: 'Lisa Wilson',
    submittedDate: '2024-01-14',
    lastUpdated: '2024-01-15',
    description: 'Monthly safety reports are not generating correctly. Data appears to be missing.'
  },
  {
    id: 'TKT-003',
    title: 'Mobile App Crash',
    category: 'Mobile',
    priority: 'critical',
    status: 'open',
    assignedTo: 'Tom Brown',
    submittedBy: 'Alex Chen',
    submittedDate: '2024-01-13',
    lastUpdated: '2024-01-14',
    description: 'Mobile app crashes immediately when opening incident reporting module.'
  },
  {
    id: 'TKT-004',
    title: 'Training Module Access',
    category: 'Access',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'Sarah Johnson',
    submittedBy: 'David Lee',
    submittedDate: '2024-01-12',
    lastUpdated: '2024-01-13',
    description: 'Need access to training module for new employee onboarding.'
  },
  {
    id: 'TKT-005',
    title: 'Data Export Issue',
    category: 'Data',
    priority: 'medium',
    status: 'closed',
    assignedTo: 'Mike Davis',
    submittedBy: 'Emma Rodriguez',
    submittedDate: '2024-01-11',
    lastUpdated: '2024-01-12',
    description: 'Unable to export employee data to Excel format. Error occurs during export process.'
  }
];

const SupportPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    status: '',
    priority: '',
    category: ''
  });

  const handleCreateTicket = () => {
    setActiveModal('create-ticket');
    setFormData({});
  };

  const handleViewTicket = (ticketId: string) => {
    setActiveModal('view-ticket');
    const ticket = mockTickets.find(t => t.id === ticketId);
    setFormData(ticket || {});
  };

  const handleEditTicket = (ticketId: string) => {
    setActiveModal('edit-ticket');
    const ticket = mockTickets.find(t => t.id === ticketId);
    setFormData(ticket || {});
  };

  const handleDeleteTicket = (ticketId: string) => {
    setActiveModal('delete-ticket');
    setFormData({ id: ticketId });
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

  // Filter tickets based on search and filter criteria
  const filteredTickets = mockTickets.filter(ticket => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || (
      ticket.title.toLowerCase().includes(query) ||
      ticket.category.toLowerCase().includes(query) ||
      ticket.assignedTo.toLowerCase().includes(query) ||
      ticket.submittedBy.toLowerCase().includes(query)
    );

    // Filter criteria
    const matchesStatus = !filterCriteria.status || 
      ticket.status.toLowerCase() === filterCriteria.status.toLowerCase();
    
    const matchesPriority = !filterCriteria.priority || 
      ticket.priority.toLowerCase() === filterCriteria.priority.toLowerCase();
    
    const matchesCategory = !filterCriteria.category || 
      ticket.category.toLowerCase() === filterCriteria.category.toLowerCase();

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    setFilterCriteria(filters);
  };

  const handleSuggestionClick = (ticket: any) => {
    setSearchQuery(ticket.title);
  };

  const getIcon = (ticket: any) => {
    return <HelpCircle size={16} color="var(--text-secondary)" />;
  };

  const getTitle = (ticket: any) => ticket.title;
  const getDetails = (ticket: any) => `${ticket.category} • ${ticket.assignedTo} • ${ticket.status}`;

  const renderModal = () => {
    if (!activeModal) return null;

    const modalConfig = {
      'create-ticket': {
        title: 'Create New Support Ticket',
        fields: [
          { name: 'title', label: 'Ticket Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'select', options: ['Technical', 'Reports', 'Mobile', 'Access', 'Data', 'Training', 'General'] },
          { name: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
          { name: 'assignedTo', label: 'Assign To', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      },
      'edit-ticket': {
        title: 'Edit Support Ticket',
        fields: [
          { name: 'title', label: 'Ticket Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'select', options: ['Technical', 'Reports', 'Mobile', 'Access', 'Data', 'Training', 'General'] },
          { name: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
          { name: 'status', label: 'Status', type: 'select', options: ['Open', 'In Progress', 'Resolved', 'Closed'] },
          { name: 'assignedTo', label: 'Assign To', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      },
      'delete-ticket': {
        title: 'Delete Ticket',
        fields: []
      }
    };

    const config = modalConfig[activeModal as keyof typeof modalConfig];
    if (!config) return null;

    if (activeModal === 'delete-ticket') {
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
                <h3>Delete Ticket</h3>
                <button className="close-button" onClick={closeModal}>
                  <X size={20} />
                </button>
              </ModalHeader>
              
              <div style={{ padding: '0 24px 24px' }}>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Are you sure you want to delete this ticket? This action cannot be undone.
                </p>
                
                <ButtonGroup>
                  <Button onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button $variant="primary" onClick={() => handleSubmit('Delete Ticket')}>
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
                  {activeModal === 'create-ticket' ? 'Create' : 'Save Changes'}
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
      label: 'Total Tickets',
      value: '156',
      change: '+12',
      changeType: 'positive',
      icon: <HelpCircle size={20} />,
      color: '#667eea'
    },
    {
      label: 'Open Tickets',
      value: '23',
      change: '+3',
      changeType: 'negative',
      icon: <AlertTriangle size={20} />,
      color: '#f59e0b'
    },
    {
      label: 'In Progress',
      value: '8',
      change: '-2',
      changeType: 'positive',
      icon: <Clock size={20} />,
      color: '#3b82f6'
    },
    {
      label: 'Resolved',
      value: '125',
      change: '+15',
      changeType: 'positive',
      icon: <CheckCircle size={20} />,
      color: '#10b981'
    }
  ];

  return (
    <PageContainer>
      <PageHeader>
        <HeaderContent>
          <h1>Support Tickets</h1>
          <p>Manage support tickets, track issues, and provide technical assistance</p>
        </HeaderContent>
        <ActionButtons>
          <Button onClick={handleCreateTicket}>
            <Plus size={16} />
            Create Ticket
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
          data={mockTickets}
          searchFields={['title', 'category', 'assignedTo', 'submittedBy']}
          filterFields={[
            { name: 'status', label: 'Status', type: 'select', options: ['Open', 'In Progress', 'Resolved', 'Closed'] },
            { name: 'priority', label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
            { name: 'category', label: 'Category', type: 'select', options: ['Technical', 'Reports', 'Mobile', 'Access', 'Data', 'Training', 'General'] }
          ]}
          placeholder="Search tickets by title, category, or assignee..."
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onSuggestionClick={handleSuggestionClick}
          getIcon={getIcon}
          getTitle={getTitle}
          getDetails={getDetails}
          searchQuery={searchQuery}
          filterCriteria={filterCriteria}
          modalTitle="Filter Tickets"
        />
      </div>

      <TicketTable>
        <TableHeader>
          <div>Ticket Title</div>
          <div>Category</div>
          <div>Priority</div>
          <div>Status</div>
          <div>Assigned To</div>
          <div>Last Updated</div>
          <div>Actions</div>
        </TableHeader>
        
        {(searchQuery || filterCriteria.status || filterCriteria.priority || filterCriteria.category ? filteredTickets : mockTickets).map((ticket, index) => (
          <TableRow
            key={ticket.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <div style={{ fontWeight: 500, color: '#1f2937' }}>{ticket.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>ID: {ticket.id}</div>
            </div>
            <div>{ticket.category}</div>
            <div>
              <PriorityBadge $priority={ticket.priority}>
                {ticket.priority === 'low' && <CheckCircle size={12} />}
                {ticket.priority === 'medium' && <Clock size={12} />}
                {ticket.priority === 'high' && <AlertTriangle size={12} />}
                {ticket.priority === 'critical' && <AlertOctagon size={12} />}
                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
              </PriorityBadge>
            </div>
            <div>
              <StatusBadge $status={ticket.status}>
                {ticket.status === 'open' && <AlertTriangle size={12} />}
                {ticket.status === 'in-progress' && <Clock size={12} />}
                {ticket.status === 'resolved' && <CheckCircle size={12} />}
                {ticket.status === 'closed' && <Square size={12} />}
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </StatusBadge>
            </div>
            <div>{ticket.assignedTo}</div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              {ticket.lastUpdated}
            </div>
            <ActionButtonsCell>
              <button className="view" onClick={() => handleViewTicket(ticket.id)}>
                <Eye size={14} />
              </button>
              <button className="edit" onClick={() => handleEditTicket(ticket.id)}>
                <Edit size={14} />
              </button>
              <button className="delete" onClick={() => handleDeleteTicket(ticket.id)}>
                <Trash2 size={14} />
              </button>
            </ActionButtonsCell>
          </TableRow>
        ))}
      </TicketTable>

      {renderModal()}
    </PageContainer>
  );
};

export default SupportPage; 