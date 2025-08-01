import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  AlertCircle,
  CheckCircle,
  X,
  ChevronRight,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
`;

const Header = styled.div`
  margin-bottom: 32px;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled(motion.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--glass-shadow);
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  
  .stat-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const ActionsBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--primary-color);
  border: none;
  border-radius: var(--border-radius-sm);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(31, 38, 135, 0.4);
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  
  input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius-sm);
    background: var(--glass-bg);
    color: var(--text-primary);
    backdrop-filter: blur(16px);
    
    &::placeholder {
      color: var(--text-secondary);
    }
  }
`;

const IncidentsGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const IncidentCard = styled(motion.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--glass-shadow);
  
  .incident-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  
  .incident-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  
  .incident-meta {
    display: flex;
    gap: 16px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
  
  .incident-description {
    color: var(--text-secondary);
    margin-bottom: 16px;
    line-height: 1.5;
  }
  
  .incident-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    
    &.open {
      background: rgba(248, 113, 113, 0.2);
      color: #f87171;
    }
    
    &.investigating {
      background: rgba(251, 191, 36, 0.2);
      color: #fbbf24;
    }
    
    &.resolved {
      background: rgba(74, 222, 128, 0.2);
      color: #4ade80;
    }
  }
  
  .actions {
    display: flex;
    gap: 8px;
    
    button {
      padding: 6px;
      border: none;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-secondary);
      cursor: pointer;
      transition: var(--transition);
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        color: var(--text-primary);
      }
    }
  }
`;

const mockIncidents = [
  {
    id: 1,
    title: 'Slip and Fall Incident',
    description: 'Employee slipped on wet floor in warehouse area. No serious injuries reported.',
    location: 'Warehouse A',
    reportedBy: 'Sarah Johnson',
    reportedAt: '2024-01-15 14:30',
    status: 'open',
    priority: 'Medium'
  },
  {
    id: 2,
    title: 'Equipment Malfunction',
    description: 'Forklift brake system failure during operation. Equipment taken out of service.',
    location: 'Loading Dock',
    reportedBy: 'Mike Davis',
    reportedAt: '2024-01-14 09:15',
    status: 'investigating',
    priority: 'High'
  },
  {
    id: 3,
    title: 'Chemical Spill',
    description: 'Minor chemical spill in laboratory. Cleanup completed successfully.',
    location: 'Lab B',
    reportedBy: 'Lisa Wilson',
    reportedAt: '2024-01-13 16:45',
    status: 'resolved',
    priority: 'Medium'
  },
  {
    id: 4,
    title: 'Near Miss - Falling Object',
    description: 'Tool fell from scaffolding but no one was injured. Safety protocols reviewed.',
    location: 'Construction Site',
    reportedBy: 'Robert Brown',
    reportedAt: '2024-01-12 11:20',
    status: 'resolved',
    priority: 'Low'
  }
];

// Search and Filter Components
const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-sm);
  background: var(--glass-bg);
  color: var(--text-primary);
  backdrop-filter: blur(16px);
  font-size: 1rem;
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const SearchSuggestions = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--glass-shadow);
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 4px;
`;

const SuggestionItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .incident-info {
    flex: 1;
    
    .incident-title {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 2px;
    }
    
    .incident-details {
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
  }
  
  .chevron {
    color: var(--text-secondary);
    opacity: 0.7;
  }
`;

const NoResults = styled.div`
  padding: 16px;
  text-align: center;
  color: var(--text-secondary);
  font-style: italic;
`;

const SearchHighlight = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 1px 2px;
  border-radius: 2px;
`;

const FilterIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  
  .filter-count {
    background: var(--primary-color);
    color: white;
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 600;
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
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  padding: 24px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--glass-shadow);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
  
  .close-button {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-primary);
    font-weight: 500;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--glass-border);
    border-radius: var(--border-radius-sm);
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    font-size: 1rem;
    
    &::placeholder {
      color: var(--text-secondary);
    }
    
    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.3);
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
  border-radius: var(--border-radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  background: ${props => props.$variant === 'primary' ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$variant === 'primary' ? 'white' : 'var(--text-primary)'};
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const IncidentReportingPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [filterCriteria, setFilterCriteria] = useState({
    status: '',
    priority: '',
    location: ''
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  
  // Check permissions for different actions
  const canCreate = hasAccess('Incident Reporting', 'create');
  const canEdit = hasAccess('Incident Reporting', 'edit');
  const canDelete = hasAccess('Incident Reporting', 'delete');
  const canView = hasAccess('Incident Reporting', 'view');

  // Search and filter functionality
  const filteredIncidents = mockIncidents.filter(incident => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || (
      incident.title.toLowerCase().includes(query) ||
      incident.description.toLowerCase().includes(query) ||
      incident.location.toLowerCase().includes(query) ||
      incident.reportedBy.toLowerCase().includes(query)
    );

    // Filter criteria
    const matchesStatus = !filterCriteria.status || 
      incident.status === filterCriteria.status;
    
    const matchesPriority = !filterCriteria.priority || 
      incident.priority.toLowerCase() === filterCriteria.priority.toLowerCase();
    
    const matchesLocation = !filterCriteria.location || 
      incident.location.toLowerCase().includes(filterCriteria.location.toLowerCase());

    return matchesSearch && matchesStatus && matchesPriority && matchesLocation;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (incident: any) => {
    setSearchQuery(incident.title);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < filteredIncidents.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && filteredIncidents[selectedSuggestionIndex]) {
          handleSuggestionClick(filteredIncidents[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <SearchHighlight key={index}>{part}</SearchHighlight>
      ) : (
        part
      )
    );
  };

  const closeModal = () => {
    setActiveModal(null);
    setFormData({});
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const renderModal = () => {
    switch (activeModal) {
      case 'filter-incidents':
        return (
          <ModalContent>
            <ModalHeader>
              <h2>Filter Incidents</h2>
              <button className="close-button" onClick={closeModal}>
                <X size={20} />
              </button>
            </ModalHeader>
            
            <FormGroup>
              <label>Status</label>
              <select 
                value={formData.status || ''} 
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label>Priority</label>
              <select 
                value={formData.priority || ''} 
                onChange={(e) => handleInputChange('priority', e.target.value)}
              >
                <option value="">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label>Location</label>
              <input 
                type="text" 
                placeholder="Filter by location"
                value={formData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={() => {
                setFilterCriteria({
                  status: '',
                  priority: '',
                  location: ''
                });
                setFormData({});
                closeModal();
              }}>
                Clear All
              </Button>
              <Button $variant="primary" onClick={() => {
                setFilterCriteria({
                  status: formData.status || '',
                  priority: formData.priority || '',
                  location: formData.location || ''
                });
                closeModal();
              }}>
                Apply Filters
              </Button>
            </ButtonGroup>
          </ModalContent>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Incident Reporting
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {user?.role === 'Client' || user?.role === 'Auditor' 
            ? 'View incident reports and safety data (Read-only access)'
            : 'Report, track, and investigate safety incidents and near misses'
          }
        </motion.p>
      </Header>

      {canView && (
        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="stat-value">24</div>
            <div className="stat-label">Total Incidents</div>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-value">8</div>
            <div className="stat-label">Open Cases</div>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-value">12</div>
            <div className="stat-label">Under Investigation</div>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="stat-value">4</div>
            <div className="stat-label">Resolved This Month</div>
          </StatCard>
        </StatsGrid>
      )}

      {canCreate && (
        <ActionsBar>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} />
            Report Incident
          </ActionButton>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            Export Report
          </ActionButton>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AlertTriangle size={16} />
            Emergency Contact
          </ActionButton>
        </ActionsBar>
      )}

      <SearchBar>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search incidents by title, description, location, or reporter..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          
          <AnimatePresence>
            {showSuggestions && (
              <SearchSuggestions
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {filteredIncidents.length > 0 ? (
                  filteredIncidents.map((incident, index) => (
                    <SuggestionItem
                      key={incident.id}
                      onClick={() => handleSuggestionClick(incident)}
                      style={{
                        background: index === selectedSuggestionIndex 
                          ? 'rgba(255, 255, 255, 0.15)' 
                          : 'transparent'
                      }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AlertTriangle size={16} color="var(--text-secondary)" />
                      <div className="incident-info">
                        <div className="incident-title">
                          {highlightText(incident.title, searchQuery)}
                        </div>
                        <div className="incident-details">
                          {incident.location} • {incident.reportedBy}
                        </div>
                      </div>
                      <ChevronRight size={16} className="chevron" />
                    </SuggestionItem>
                  ))
                ) : (
                  <NoResults>
                    No incidents found matching "{searchQuery}"
                  </NoResults>
                )}
              </SearchSuggestions>
            )}
          </AnimatePresence>
        </SearchContainer>
        
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search size={16} />
          Search
        </ActionButton>
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveModal('filter-incidents')}
        >
          <Filter size={16} />
          Filter
        </ActionButton>
      </SearchBar>

      {/* Filter Indicator */}
      {(filterCriteria.status || filterCriteria.priority || filterCriteria.location) && (
        <FilterIndicator>
          <Filter size={14} />
          Active Filters:
          <span className="filter-count">
            {[
              filterCriteria.status && 'Status',
              filterCriteria.priority && 'Priority',
              filterCriteria.location && 'Location'
            ].filter(Boolean).length}
          </span>
          <button 
            onClick={() => setFilterCriteria({ status: '', priority: '', location: '' })}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              textDecoration: 'underline'
            }}
          >
            Clear all
          </button>
        </FilterIndicator>
      )}

      <IncidentsGrid>
        {(searchQuery || filterCriteria.status || filterCriteria.priority || filterCriteria.location ? filteredIncidents : mockIncidents).map((incident, index) => (
          <IncidentCard
            key={incident.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="incident-header">
              <div>
                <div className="incident-title">{incident.title}</div>
                <div className="incident-meta">
                  <span>📍 {incident.location}</span>
                  <span>👤 {incident.reportedBy}</span>
                  <span>⏰ {incident.reportedAt}</span>
                  <span>⚠️ {incident.priority}</span>
                </div>
              </div>
              <div className={`status ${incident.status}`}>
                {incident.status === 'open' && <AlertCircle size={14} />}
                {incident.status === 'investigating' && <Clock size={14} />}
                {incident.status === 'resolved' && <CheckCircle size={14} />}
                {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
              </div>
            </div>
            <div className="incident-description">
              {incident.description}
            </div>
            <div className="incident-footer">
              <div className="actions">
                <button title="View Details">
                  <Eye size={14} />
                </button>
                <button title="Edit">
                  <Edit size={14} />
                </button>
                <button title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </IncidentCard>
        ))}
      </IncidentsGrid>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeModal && (
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
              {renderModal()}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default IncidentReportingPage; 