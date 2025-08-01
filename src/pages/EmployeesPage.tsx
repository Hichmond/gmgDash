import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Search, 
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  X,
  ChevronRight,
  User
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

const EmployeesTable = styled.div`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--glass-shadow);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
  gap: 16px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid var(--glass-border);
  font-weight: 600;
  color: var(--text-primary);
`;

const TableRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  .status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    
    &.active {
      background: rgba(74, 222, 128, 0.2);
      color: #4ade80;
    }
    
    &.inactive {
      background: rgba(248, 113, 113, 0.2);
      color: #f87171;
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

const mockEmployees = [
  {
    id: 1,
    name: 'John Smith',
    position: 'Safety Manager',
    department: 'Safety',
    status: 'active',
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Field Technician',
    department: 'Operations',
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: 3,
    name: 'Mike Davis',
    position: 'Compliance Officer',
    department: 'Compliance',
    status: 'inactive',
    lastActive: '3 days ago'
  },
  {
    id: 4,
    name: 'Lisa Wilson',
    position: 'Training Coordinator',
    department: 'HR',
    status: 'active',
    lastActive: '30 minutes ago'
  },
  {
    id: 5,
    name: 'Robert Brown',
    position: 'Site Supervisor',
    department: 'Operations',
    status: 'active',
    lastActive: '4 hours ago'
  },
  {
    id: 6,
    name: 'Jennifer Martinez',
    position: 'Environmental Specialist',
    department: 'Environmental',
    status: 'active',
    lastActive: '45 minutes ago'
  },
  {
    id: 7,
    name: 'David Thompson',
    position: 'Maintenance Engineer',
    department: 'Maintenance',
    status: 'active',
    lastActive: '2 hours ago'
  },
  {
    id: 8,
    name: 'Emily Rodriguez',
    position: 'Quality Control Inspector',
    department: 'Quality',
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: 9,
    name: 'James Wilson',
    position: 'Safety Coordinator',
    department: 'Safety',
    status: 'active',
    lastActive: '30 minutes ago'
  },
  {
    id: 10,
    name: 'Amanda Lee',
    position: 'Operations Manager',
    department: 'Operations',
    status: 'active',
    lastActive: '15 minutes ago'
  },
  {
    id: 11,
    name: 'Michael Chen',
    position: 'Training Specialist',
    department: 'HR',
    status: 'inactive',
    lastActive: '1 week ago'
  },
  {
    id: 12,
    name: 'Jessica Taylor',
    position: 'Compliance Analyst',
    department: 'Compliance',
    status: 'active',
    lastActive: '3 hours ago'
  }
];

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

const FileUploadArea = styled.div`
  border: 2px dashed var(--glass-border);
  border-radius: var(--border-radius-sm);
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.05);
  }
  
  .upload-icon {
    font-size: 2rem;
    margin-bottom: 12px;
    opacity: 0.7;
  }
  
  .upload-text {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const ExportOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const ExportOption = styled.div`
  padding: 16px;
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &.selected {
    background: rgba(255, 255, 255, 0.1);
      border-color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color);
  }
  
  .option-title {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  
  .option-description {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
`;

const DateInputGroup = styled.div`
  display: flex;
  gap: 12px;
  
  input[type="date"] {
    flex: 1;
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
    
    /* Ensure date picker is visible */
    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
      cursor: pointer;
    }
  }
`;

// Search Components
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
  
  .employee-info {
    flex: 1;
    
    .employee-name {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 2px;
    }
    
    .employee-details {
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

const EmployeesPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [filterCriteria, setFilterCriteria] = useState({
    department: '',
    status: '',
    position: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Check permissions for different actions
  const canCreate = hasAccess('Employees', 'create');
  const canEdit = hasAccess('Employees', 'edit');
  const canDelete = hasAccess('Employees', 'delete');
  const canView = hasAccess('Employees', 'view');

  const closeModal = () => {
    setActiveModal(null);
    setFormData({});
  };

  const handleSubmit = (actionType: string) => {
    // Handle form submission based on action type
    console.log(`Submitting ${actionType}:`, formData);
    
    // Here you would typically send the data to your backend
    alert(`${actionType} submitted successfully!`);
    
    closeModal();
  };

  const handleInputChange = (field: string, value: any) => {
    console.log(`Updating ${field} to:`, value);
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // Search and filter functionality
  const filteredEmployees = mockEmployees.filter(employee => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || (
      employee.name.toLowerCase().includes(query) ||
      employee.position.toLowerCase().includes(query) ||
      employee.department.toLowerCase().includes(query)
    );

    // Filter criteria
    const matchesDepartment = !filterCriteria.department || 
      employee.department.toLowerCase() === filterCriteria.department.toLowerCase();
    
    const matchesStatus = !filterCriteria.status || 
      employee.status === filterCriteria.status;
    
    const matchesPosition = !filterCriteria.position || 
      employee.position.toLowerCase().includes(filterCriteria.position.toLowerCase());

    return matchesSearch && matchesDepartment && matchesStatus && matchesPosition;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (employee: any) => {
    setSearchQuery(employee.name);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < filteredEmployees.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && filteredEmployees[selectedSuggestionIndex]) {
          handleSuggestionClick(filteredEmployees[selectedSuggestionIndex]);
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

  const renderModal = () => {
    switch (activeModal) {
      case 'add-employee':
        return (
          <ModalContent>
            <ModalHeader>
              <h2>Add Employee</h2>
              <button className="close-button" onClick={closeModal}>
                <X size={20} />
              </button>
            </ModalHeader>
            
            <FormGroup>
              <label>First Name</label>
              <input 
                type="text" 
                placeholder="Enter first name"
                value={formData.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Last Name</label>
              <input 
                type="text" 
                placeholder="Enter last name"
                value={formData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter email address"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Department</label>
              <select 
                value={formData.department || ''} 
                onChange={(e) => handleInputChange('department', e.target.value)}
              >
                <option value="">Select department</option>
                <option value="operations">Operations</option>
                <option value="maintenance">Maintenance</option>
                <option value="safety">Safety</option>
                <option value="environmental">Environmental</option>
                <option value="quality">Quality</option>
                <option value="hr">Human Resources</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label>Position</label>
              <input 
                type="text" 
                placeholder="Enter job position"
                value={formData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Hire Date</label>
              <input 
                type="date" 
                value={formData.hireDate || ''}
                onChange={(e) => handleInputChange('hireDate', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <label>Employee ID</label>
              <input 
                type="text" 
                placeholder="Enter employee ID"
                value={formData.employeeId || ''}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
              />
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={closeModal}>Cancel</Button>
              <Button $variant="primary" onClick={() => handleSubmit('Employee Addition')}>
                Add Employee
              </Button>
            </ButtonGroup>
          </ModalContent>
        );

      case 'import-data':
        return (
          <ModalContent>
            <ModalHeader>
              <h2>Import Employee Data</h2>
              <button className="close-button" onClick={closeModal}>
                <X size={20} />
              </button>
            </ModalHeader>
            
            <FormGroup>
              <label>Import Type</label>
              <select 
                value={formData.importType || ''} 
                onChange={(e) => handleInputChange('importType', e.target.value)}
              >
                <option value="">Select import type</option>
                <option value="csv">CSV File</option>
                <option value="excel">Excel File</option>
                <option value="json">JSON File</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label>File Upload</label>
              <FileUploadArea>
                <div className="upload-icon">📄</div>
                <div className="upload-text">Click to upload or drag and drop</div>
                <input 
                  type="file" 
                  accept=".csv,.xlsx,.xls,.json"
                  style={{ display: 'none' }}
                  onChange={(e) => handleInputChange('file', e.target.files?.[0])}
                />
              </FileUploadArea>
            </FormGroup>
            
            <FormGroup>
              <label>Import Options</label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.updateExisting || false}
                    onChange={(e) => handleInputChange('updateExisting', e.target.checked)}
                  />
                  Update existing records
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="checkbox" 
                    checked={formData.skipErrors || false}
                    onChange={(e) => handleInputChange('skipErrors', e.target.checked)}
                  />
                  Skip errors and continue
                </label>
              </div>
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={closeModal}>Cancel</Button>
              <Button $variant="primary" onClick={() => handleSubmit('Data Import')}>
                Import Data
              </Button>
            </ButtonGroup>
          </ModalContent>
        );

      case 'export-report':
        return (
          <ModalContent>
            <ModalHeader>
              <h2>Export Employee Report</h2>
              <button className="close-button" onClick={closeModal}>
                <X size={20} />
              </button>
            </ModalHeader>
            
            <FormGroup>
              <label>Report Type</label>
              <ExportOptions>
                <ExportOption 
                  className={formData.reportType === 'employee-list' ? 'selected' : ''}
                  onClick={() => handleInputChange('reportType', 'employee-list')}
                >
                  <div className="option-title">Employee List</div>
                  <div className="option-description">Complete employee directory with basic info</div>
                </ExportOption>
                <ExportOption 
                  className={formData.reportType === 'training-status' ? 'selected' : ''}
                  onClick={() => handleInputChange('reportType', 'training-status')}
                >
                  <div className="option-title">Training Status</div>
                  <div className="option-description">Employee training and certification status</div>
                </ExportOption>
                <ExportOption 
                  className={formData.reportType === 'compliance-report' ? 'selected' : ''}
                  onClick={() => handleInputChange('reportType', 'compliance-report')}
                >
                  <div className="option-title">Compliance Report</div>
                  <div className="option-description">Regulatory compliance and audit data</div>
                </ExportOption>
                <ExportOption 
                  className={formData.reportType === 'custom-report' ? 'selected' : ''}
                  onClick={() => handleInputChange('reportType', 'custom-report')}
                >
                  <div className="option-title">Custom Report</div>
                  <div className="option-description">Build your own report with specific fields</div>
                </ExportOption>
              </ExportOptions>
            </FormGroup>
            
            <FormGroup>
              <label>Date Range</label>
              <DateInputGroup>
                <input 
                  type="date" 
                  placeholder="Start date"
                  value={formData.startDate || ''}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
                <input 
                  type="date" 
                  placeholder="End date"
                  value={formData.endDate || ''}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </DateInputGroup>
            </FormGroup>
            
            <FormGroup>
              <label>Export Format</label>
              <select 
                value={formData.exportFormat || ''} 
                onChange={(e) => handleInputChange('exportFormat', e.target.value)}
              >
                <option value="">Select format</option>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
              </select>
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={closeModal}>Cancel</Button>
              <Button $variant="primary" onClick={() => handleSubmit('Report Export')}>
                Export Report
              </Button>
            </ButtonGroup>
          </ModalContent>
        );

      case 'filter-employees':
        return (
          <ModalContent>
            <ModalHeader>
              <h2>Filter Employees</h2>
              <button className="close-button" onClick={closeModal}>
                <X size={20} />
              </button>
            </ModalHeader>
            
            <FormGroup>
              <label>Department</label>
              <select 
                value={formData.department || ''} 
                onChange={(e) => handleInputChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="safety">Safety</option>
                <option value="operations">Operations</option>
                <option value="compliance">Compliance</option>
                <option value="hr">HR</option>
                <option value="environmental">Environmental</option>
                <option value="maintenance">Maintenance</option>
                <option value="quality">Quality</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label>Status</label>
              <select 
                value={formData.status || ''} 
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label>Position</label>
              <input 
                type="text" 
                placeholder="Filter by position (e.g., Manager, Technician)"
                value={formData.position || ''}
                onChange={(e) => handleInputChange('position', e.target.value)}
              />
            </FormGroup>
            
            <ButtonGroup>
              <Button onClick={() => {
                setFilterCriteria({
                  department: '',
                  status: '',
                  position: ''
                });
                setFormData({});
                closeModal();
              }}>
                Clear All
              </Button>
              <Button $variant="primary" onClick={() => {
                setFilterCriteria({
                  department: formData.department || '',
                  status: formData.status || '',
                  position: formData.position || ''
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
          Employees
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {user?.role === 'Client' || user?.role === 'Auditor' 
            ? 'View employee information and certifications (Read-only access)'
            : 'Manage employee profiles, training records, and certifications'
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
            <div className="stat-value">156</div>
            <div className="stat-label">Total Employees</div>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="stat-value">142</div>
            <div className="stat-label">Active Employees</div>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="stat-value">89%</div>
            <div className="stat-label">Training Compliance</div>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="stat-value">23</div>
            <div className="stat-label">Pending Certifications</div>
          </StatCard>
        </StatsGrid>
      )}

      {canCreate && (
        <ActionsBar>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveModal('add-employee')}
          >
            <UserPlus size={16} />
            Add Employee
          </ActionButton>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveModal('import-data')}
          >
            <Upload size={16} />
            Import Data
          </ActionButton>
          <ActionButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveModal('export-report')}
          >
            <Download size={16} />
            Export Report
          </ActionButton>
        </ActionsBar>
      )}

      {canView && (
        <>
          <SearchBar>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="Search employees by name, position, or department..."
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
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee, index) => (
                        <SuggestionItem
                          key={employee.id}
                          onClick={() => handleSuggestionClick(employee)}
                          style={{
                            background: index === selectedSuggestionIndex 
                              ? 'rgba(255, 255, 255, 0.15)' 
                              : 'transparent'
                          }}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <User size={16} color="var(--text-secondary)" />
                          <div className="employee-info">
                            <div className="employee-name">
                              {highlightText(employee.name, searchQuery)}
                            </div>
                            <div className="employee-details">
                              {employee.position} • {employee.department}
                            </div>
                          </div>
                          <ChevronRight size={16} className="chevron" />
                        </SuggestionItem>
                      ))
                    ) : (
                      <NoResults>
                        No employees found matching "{searchQuery}"
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
              onClick={() => setActiveModal('filter-employees')}
            >
              <Filter size={16} />
              Filter
            </ActionButton>
          </SearchBar>

          {/* Filter Indicator */}
          {(filterCriteria.department || filterCriteria.status || filterCriteria.position) && (
            <FilterIndicator>
              <Filter size={14} />
              Active Filters:
              <span className="filter-count">
                {[
                  filterCriteria.department && 'Department',
                  filterCriteria.status && 'Status',
                  filterCriteria.position && 'Position'
                ].filter(Boolean).length}
              </span>
              <button 
                onClick={() => setFilterCriteria({ department: '', status: '', position: '' })}
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

          <EmployeesTable>
            <TableHeader>
              <div>Name</div>
              <div>Position</div>
              <div>Department</div>
              <div>Status</div>
              <div>Last Active</div>
              {(canEdit || canDelete) && <div>Actions</div>}
            </TableHeader>
            {(searchQuery ? filteredEmployees : mockEmployees).map((employee, index) => (
              <TableRow
                key={employee.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div>{employee.name}</div>
                <div>{employee.position}</div>
                <div>{employee.department}</div>
                <div className={`status ${employee.status}`}>
                  {employee.status === 'active' ? 'Active' : 'Inactive'}
                </div>
                <div>{employee.lastActive}</div>
                {(canEdit || canDelete) && (
                  <div className="actions">
                    <button title="View">
                      <Eye size={14} />
                    </button>
                    {canEdit && (
                      <button title="Edit">
                        <Edit size={14} />
                      </button>
                    )}
                    {canDelete && (
                      <button title="Delete">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                )}
              </TableRow>
            ))}
          </EmployeesTable>
        </>
      )}

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

export default EmployeesPage; 