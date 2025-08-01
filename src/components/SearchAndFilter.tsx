import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter,
  X,
  ChevronRight,
  AlertTriangle,
  FileText,
  User,
  MessageSquare,
  Settings,
  Wrench,
  MapPin,
  BookOpen
} from 'lucide-react';

// Styled Components
const SearchContainer = styled.div`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: var(--border-radius-sm);
  background: var(--glass-border);
  color: var(--text-primary);
  backdrop-filter: blur(16px);
  font-size: 1rem;
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &:focus {
    outline: none;
    background: rgba(224, 224, 224, 0.3);
  }
`;

const SearchSuggestions = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--glass-border);
  backdrop-filter: blur(16px);
  border: none;
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
  
  .item-info {
    flex: 1;
    
    .item-title {
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 2px;
    }
    
    .item-details {
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
  background: var(--glass-border);
  backdrop-filter: blur(16px);
  border: none;
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
    border: none;
    border-radius: var(--border-radius-sm);
    background: var(--glass-border);
    color: var(--text-primary);
    font-size: 1rem;
    
    &::placeholder {
      color: var(--text-secondary);
    }
    
    &:focus {
      outline: none;
      background: rgba(224, 224, 224, 0.3);
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

// Types
interface SearchAndFilterProps {
  data: any[];
  searchFields: string[];
  filterFields: {
    name: string;
    label: string;
    type: 'select' | 'text';
    options?: string[];
  }[];
  placeholder: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (filters: any) => void;
  onSuggestionClick: (item: any) => void;
  getIcon: (item: any) => React.ReactNode;
  getTitle: (item: any) => string;
  getDetails: (item: any) => string;
  searchQuery: string;
  filterCriteria: any;
  modalTitle: string;
  onClearAll?: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  data,
  searchFields,
  filterFields,
  placeholder,
  onSearchChange,
  onFilterChange,
  onSuggestionClick,
  getIcon,
  getTitle,
  getDetails,
  searchQuery,
  filterCriteria,
  modalTitle,
  onClearAll
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Filter data based on search and filter criteria
  const filteredData = data.filter(item => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || searchFields.some(field => 
      String(item[field]).toLowerCase().includes(query)
    );

    // Filter criteria
    const matchesFilters = Object.keys(filterCriteria).every(key => {
      if (!filterCriteria[key]) return true;
      const value = String(item[key]).toLowerCase();
      const filterValue = String(filterCriteria[key]).toLowerCase();
      return value.includes(filterValue);
    });

    return matchesSearch && matchesFilters;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setShowSuggestions(value.length > 0);
    setSelectedSuggestionIndex(-1);
  };

  const handleSuggestionClick = (item: any) => {
    onSuggestionClick(item);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < filteredData.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && filteredData[selectedSuggestionIndex]) {
          handleSuggestionClick(filteredData[selectedSuggestionIndex]);
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

  const applyFilters = () => {
    onFilterChange(formData);
    closeModal();
  };

  const clearFilters = () => {
    if (onClearAll) {
      onClearAll();
    } else {
      const clearedFilters = Object.keys(filterCriteria).reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {} as any);
      onFilterChange(clearedFilters);
    }
    setFormData({});
    closeModal();
  };

  const activeFilterCount = Object.values(filterCriteria).filter(Boolean).length;

  return (
    <>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder={placeholder}
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
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <SuggestionItem
                    key={item.id || index}
                    onClick={() => handleSuggestionClick(item)}
                    style={{
                      background: index === selectedSuggestionIndex 
                        ? 'rgba(255, 255, 255, 0.15)' 
                        : 'transparent'
                    }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {getIcon(item)}
                    <div className="item-info">
                      <div className="item-title">
                        {highlightText(getTitle(item), searchQuery)}
                      </div>
                      <div className="item-details">
                        {getDetails(item)}
                      </div>
                    </div>
                    <ChevronRight size={16} className="chevron" />
                  </SuggestionItem>
                ))
              ) : (
                <NoResults>
                  No items found matching "{searchQuery}"
                </NoResults>
              )}
            </SearchSuggestions>
          )}
        </AnimatePresence>
      </SearchContainer>

      {/* Filter Indicator */}
      {activeFilterCount > 0 && (
        <FilterIndicator>
          <Filter size={14} />
          Active Filters:
          <span className="filter-count">{activeFilterCount}</span>
          <button 
            onClick={onClearAll || clearFilters}
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

      {/* Filter Modal */}
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
              <ModalHeader>
                <h2>{modalTitle}</h2>
                <button className="close-button" onClick={closeModal}>
                  <X size={20} />
                </button>
              </ModalHeader>
              
              {filterFields.map((field) => (
                <FormGroup key={field.name}>
                  <label>{field.label}</label>
                  {field.type === 'select' ? (
                    <select 
                      value={formData[field.name] || ''} 
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                    >
                      <option value="">All {field.label}</option>
                      {field.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type="text" 
                      placeholder={`Filter by ${field.label.toLowerCase()}`}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                    />
                  )}
                </FormGroup>
              ))}
              
              <ButtonGroup>
                <Button onClick={clearFilters}>
                  Clear All
                </Button>
                <Button $variant="primary" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </ButtonGroup>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchAndFilter; 