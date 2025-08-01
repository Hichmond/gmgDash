import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
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
  MessageSquare,
  HelpCircle,
  BookOpen,
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
  Meh,
  Users,
  Hash,
  Bell,
  Volume2,
  VolumeX,
  MoreHorizontal,
  Image,
  Video,
  File,
  Mic,
  Reply,
  Forward,
  Pin,
  Bookmark,
  Archive,
  AtSign,
  Lock,
  Globe,
  Zap,
  Info,
  Check,
  GraduationCap,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  ExternalLink,
  SortAsc,
  SortDesc,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Minus
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
    color: #010c52;
    margin-bottom: 8px;
  }
  
  p {
    color: #333;
    font-size: 1rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
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

const MainContent = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
`;

const ContentHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
  
  .section-actions {
    display: flex;
    gap: 8px;
  }
`;

const TalkCard = styled(motion.div)`
  padding: 20px;
  border-bottom: 1px solid var(--glass-border);
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  .talk-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  
  .talk-title {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 1rem;
    margin-bottom: 4px;
  }
  
  .talk-category {
    color: var(--text-secondary);
    font-size: 0.8rem;
  }
  
  .talk-progress {
    margin: 12px 0;
    
    .progress-bar {
      width: 100%;
      height: 6px;
      background: #e5e7eb;
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    
    .progress-fill {
      height: 100%;
      background: var(--primary-color);
      border-radius: 3px;
      transition: width 0.3s ease;
    }
    
    .progress-text {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      color: var(--text-secondary);
    }
  }
  
  .talk-meta {
    display: flex;
    gap: 16px;
    font-size: 0.8rem;
    color: var(--text-secondary);
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
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
      case 'scheduled':
        return 'background: #dbeafe; color: #1d4ed8;';
      case 'overdue':
        return 'background: #fee2e2; color: #991b1b;';
      case 'draft':
        return 'background: #f3f4f6; color: #374151;';
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
    color: var(--text-primary);
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    color: var(--text-secondary);
    
    &:hover {
      background: var(--bg-tertiary);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  input, select, textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    font-size: 0.9rem;
    transition: border-color 0.2s ease;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
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
const mockToolboxTalks = [
  {
    id: 'TT-001',
    title: 'Fall Protection Safety',
    category: 'Safety Equipment',
    status: 'completed',
    progress: 100,
    duration: '30 minutes',
    facilitator: 'Sarah Johnson',
    scheduledDate: '2024-01-15',
    attendees: 12,
    maxAttendees: 15,
    description: 'Comprehensive discussion on fall protection equipment, proper usage, and safety protocols.',
    topics: ['Harness fitting', 'Anchor points', 'Inspection procedures', 'Emergency response'],
    followUpActions: ['Equipment inspection scheduled', 'Training records updated', 'Safety audit completed']
  },
  {
    id: 'TT-002',
    title: 'Hazard Communication',
    category: 'Chemical Safety',
    status: 'in-progress',
    progress: 75,
    duration: '45 minutes',
    facilitator: 'Mike Davis',
    scheduledDate: '2024-01-20',
    attendees: 8,
    maxAttendees: 12,
    description: 'Understanding chemical hazards, safety data sheets, and proper labeling requirements.',
    topics: ['SDS interpretation', 'Chemical labeling', 'PPE requirements', 'Emergency procedures'],
    followUpActions: ['Chemical inventory review', 'Labeling audit pending', 'PPE assessment needed']
  },
  {
    id: 'TT-003',
    title: 'Equipment Lockout/Tagout',
    category: 'Equipment Safety',
    status: 'scheduled',
    progress: 0,
    duration: '60 minutes',
    facilitator: 'Lisa Wilson',
    scheduledDate: '2024-01-25',
    attendees: 0,
    maxAttendees: 20,
    description: 'Proper procedures for equipment lockout and tagout to prevent accidental startup.',
    topics: ['Lockout procedures', 'Tagout requirements', 'Energy isolation', 'Verification steps'],
    followUpActions: ['Equipment assessment', 'Procedure review', 'Training schedule']
  },
  {
    id: 'TT-004',
    title: 'Emergency Response Procedures',
    category: 'Emergency',
    status: 'overdue',
    progress: 25,
    duration: '90 minutes',
    facilitator: 'Tom Brown',
    scheduledDate: '2024-01-10',
    attendees: 5,
    maxAttendees: 18,
    description: 'Emergency response protocols and evacuation procedures for various scenarios.',
    topics: ['Evacuation routes', 'Emergency contacts', 'First aid procedures', 'Communication protocols'],
    followUpActions: ['Emergency plan review', 'Drill scheduling', 'Contact list update']
  }
];

const ToolboxTalksPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    status: '',
    category: '',
    facilitator: ''
  });

  const handleCreateTalk = () => {
    setActiveModal('create-talk');
    setFormData({});
  };

  const handleViewTalk = (talkId: string) => {
    setActiveModal('view-talk');
    const talk = mockToolboxTalks.find(t => t.id === talkId);
    setFormData(talk || {});
  };

  const handleEditTalk = (talkId: string) => {
    setActiveModal('edit-talk');
    const talk = mockToolboxTalks.find(t => t.id === talkId);
    setFormData(talk || {});
  };

  const handleDeleteTalk = (talkId: string) => {
    setActiveModal('delete-talk');
    setFormData({ id: talkId });
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

  // Filter talks based on search and filter criteria
  const filteredTalks = mockToolboxTalks.filter(talk => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || (
      talk.title.toLowerCase().includes(query) ||
      talk.category.toLowerCase().includes(query) ||
      talk.facilitator.toLowerCase().includes(query)
    );

    // Filter criteria
    const matchesStatus = !filterCriteria.status || 
      talk.status.toLowerCase() === filterCriteria.status.toLowerCase();
    
    const matchesCategory = !filterCriteria.category || 
      talk.category.toLowerCase() === filterCriteria.category.toLowerCase();
    
    const matchesFacilitator = !filterCriteria.facilitator || 
      talk.facilitator.toLowerCase() === filterCriteria.facilitator.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory && matchesFacilitator;
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    setFilterCriteria(filters);
  };

  const handleSuggestionClick = (talk: any) => {
    setSearchQuery(talk.title);
  };

  const getIcon = (talk: any) => {
    return <MessageSquare size={16} color="var(--text-secondary)" />;
  };

  const getTitle = (talk: any) => talk.title;
  const getDetails = (talk: any) => `${talk.category} • ${talk.facilitator} • ${talk.status}`;

  const renderModal = () => {
    if (!activeModal) return null;

    const modalConfig = {
      'create-talk': {
        title: 'Create New Toolbox Talk',
        fields: [
          { name: 'title', label: 'Talk Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'select', options: ['Safety Equipment', 'Chemical Safety', 'Equipment Safety', 'Emergency', 'General Safety'] },
          { name: 'facilitator', label: 'Facilitator', type: 'text' },
          { name: 'duration', label: 'Duration', type: 'text' },
          { name: 'scheduledDate', label: 'Scheduled Date', type: 'date' },
          { name: 'maxAttendees', label: 'Max Attendees', type: 'number' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      },
      'edit-talk': {
        title: 'Edit Toolbox Talk',
        fields: [
          { name: 'title', label: 'Talk Title', type: 'text' },
          { name: 'category', label: 'Category', type: 'select', options: ['Safety Equipment', 'Chemical Safety', 'Equipment Safety', 'Emergency', 'General Safety'] },
          { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Scheduled', 'In Progress', 'Completed', 'Overdue'] },
          { name: 'progress', label: 'Progress (%)', type: 'number' },
          { name: 'facilitator', label: 'Facilitator', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      },
      'delete-talk': {
        title: 'Delete Toolbox Talk',
        fields: []
      }
    };

    const config = modalConfig[activeModal as keyof typeof modalConfig];
    if (!config) return null;

    if (activeModal === 'delete-talk') {
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
                <h3>Delete Toolbox Talk</h3>
                <button className="close-button" onClick={closeModal}>
                  <X size={20} />
                </button>
              </ModalHeader>
              
              <div style={{ padding: '0 24px 24px' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Are you sure you want to delete this toolbox talk? This action cannot be undone.
                </p>
                
                <ButtonGroup>
                  <Button onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button $variant="primary" onClick={() => handleSubmit('Delete Toolbox Talk')}>
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
                  {activeModal === 'create-talk' ? 'Create' : 'Save Changes'}
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
      label: 'Total Talks',
      value: '24',
      change: '+3',
      changeType: 'positive',
      icon: <MessageSquare size={20} />,
      color: '#667eea'
    },
    {
      label: 'Completed',
      value: '18',
      change: '+5',
      changeType: 'positive',
      icon: <CheckCircle size={20} />,
      color: '#10b981'
    },
    {
      label: 'Scheduled',
      value: '4',
      change: '+2',
      changeType: 'positive',
      icon: <Calendar size={20} />,
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
          <h1>Toolbox Talks</h1>
          <p>Interactive safety discussion platform for team meetings and training sessions</p>
        </HeaderContent>
        <ActionButtons>
          <Button onClick={handleCreateTalk}>
            <Plus size={16} />
            Create Talk
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
          data={mockToolboxTalks}
          searchFields={['title', 'category', 'facilitator']}
          filterFields={[
            { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Scheduled', 'In Progress', 'Completed', 'Overdue'] },
            { name: 'category', label: 'Category', type: 'select', options: ['Safety Equipment', 'Chemical Safety', 'Equipment Safety', 'Emergency', 'General Safety'] },
            { name: 'facilitator', label: 'Facilitator', type: 'select', options: ['Sarah Johnson', 'Mike Davis', 'Lisa Wilson', 'Tom Brown'] }
          ]}
          placeholder="Search talks by title, category, or facilitator..."
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onSuggestionClick={handleSuggestionClick}
          getIcon={getIcon}
          getTitle={getTitle}
          getDetails={getDetails}
          searchQuery={searchQuery}
          filterCriteria={filterCriteria}
          modalTitle="Filter Toolbox Talks"
        />
      </div>

      <MainContent>
        <ContentHeader>
          <h3>Safety Discussions</h3>
          <div className="section-actions">
            <Button onClick={handleCreateTalk}>
              <Plus size={16} />
              Add Talk
            </Button>
          </div>
        </ContentHeader>
        
        {(searchQuery || filterCriteria.status || filterCriteria.category || filterCriteria.facilitator ? filteredTalks : mockToolboxTalks).map((talk, index) => (
          <TalkCard
            key={talk.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleViewTalk(talk.id)}
          >
            <div className="talk-header">
              <div>
                <div className="talk-title">{talk.title}</div>
                <div className="talk-category">{talk.category}</div>
              </div>
              <StatusBadge $status={talk.status}>
                {talk.status === 'completed' && <CheckCircle size={12} />}
                {talk.status === 'in-progress' && <Clock size={12} />}
                {talk.status === 'scheduled' && <Calendar size={12} />}
                {talk.status === 'overdue' && <AlertTriangle size={12} />}
                {talk.status === 'draft' && <FileText size={12} />}
                {talk.status.charAt(0).toUpperCase() + talk.status.slice(1)}
              </StatusBadge>
            </div>
            
            <div className="talk-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${talk.progress}%` }} />
              </div>
              <div className="progress-text">
                <span>{talk.progress}% Complete</span>
                <span>Attendees: {talk.attendees}/{talk.maxAttendees}</span>
              </div>
            </div>
            
            <div className="talk-meta">
              <div className="meta-item">
                <Clock size={12} />
                {talk.duration}
              </div>
              <div className="meta-item">
                <User size={12} />
                {talk.facilitator}
              </div>
              <div className="meta-item">
                <Calendar size={12} />
                {talk.scheduledDate}
              </div>
            </div>
          </TalkCard>
        ))}
      </MainContent>

      {renderModal()}
    </PageContainer>
  );
};

export default ToolboxTalksPage; 