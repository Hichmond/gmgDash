import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Download, 
  Search, 
  Filter,
  Folder,
  Eye,
  Edit,
  Trash2,
  Share,
  Lock,
  Calendar,
  Clock,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SearchAndFilter from '../components/SearchAndFilter';

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

const DocumentsGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const DocumentCard = styled(motion.div)`
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--glass-shadow);
  
  .document-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
  }
  
  .document-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  
  .document-meta {
    display: flex;
    gap: 16px;
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
  
  .document-description {
    color: var(--text-secondary);
    margin-bottom: 16px;
    line-height: 1.5;
  }
  
  .document-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    
    &.expired {
      background: rgba(248, 113, 113, 0.2);
      color: #f87171;
    }
    
    &.pending {
      background: rgba(251, 191, 36, 0.2);
      color: #fbbf24;
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

const mockDocuments = [
  {
    id: 1,
    title: 'Safety Policy Manual',
    description: 'Comprehensive safety policies and procedures for all employees.',
    category: 'Policies',
    uploadedBy: 'John Smith',
    uploadedAt: '2024-01-10',
    status: 'active',
    size: '2.4 MB',
    type: 'PDF'
  },
  {
    id: 2,
    title: 'Equipment Maintenance Log',
    description: 'Monthly maintenance records for all safety equipment.',
    category: 'Maintenance',
    uploadedBy: 'Mike Davis',
    uploadedAt: '2024-01-08',
    status: 'active',
    size: '1.8 MB',
    type: 'Excel'
  },
  {
    id: 3,
    title: 'Training Certification Records',
    description: 'Employee training certifications and completion records.',
    category: 'Training',
    uploadedBy: 'Lisa Wilson',
    uploadedAt: '2024-01-05',
    status: 'pending',
    size: '3.2 MB',
    type: 'PDF'
  },
  {
    id: 4,
    title: 'Incident Report Template',
    description: 'Standard template for reporting safety incidents.',
    category: 'Templates',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-01-03',
    status: 'active',
    size: '0.5 MB',
    type: 'Word'
  }
];

const DocumentsPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    category: '',
    status: '',
    type: ''
  });

  // Check permissions for different actions
  const canCreate = hasAccess('Documents', 'create');
  const canEdit = hasAccess('Documents', 'edit');
  const canDelete = hasAccess('Documents', 'delete');
  const canView = hasAccess('Documents', 'view');

  // Filter documents based on search and filter criteria
  const filteredDocuments = mockDocuments.filter(document => {
    // Search filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || (
      document.title.toLowerCase().includes(query) ||
      document.description.toLowerCase().includes(query) ||
      document.category.toLowerCase().includes(query) ||
      document.uploadedBy.toLowerCase().includes(query)
    );

    // Filter criteria
    const matchesCategory = !filterCriteria.category || 
      document.category.toLowerCase() === filterCriteria.category.toLowerCase();
    
    const matchesStatus = !filterCriteria.status || 
      document.status === filterCriteria.status;
    
    const matchesType = !filterCriteria.type || 
      document.type.toLowerCase() === filterCriteria.type.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus && matchesType;
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    setFilterCriteria(filters);
  };

  const handleSuggestionClick = (document: any) => {
    setSearchQuery(document.title);
  };

  const getIcon = (document: any) => {
    return <FileText size={16} color="var(--text-secondary)" />;
  };

  const getTitle = (document: any) => document.title;
  const getDetails = (document: any) => `${document.category} • ${document.uploadedBy} • ${document.type}`;

  return (
    <PageContainer>
      <Header>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Documents
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Manage safety documents, policies, and compliance records
        </motion.p>
      </Header>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-value">156</div>
          <div className="stat-label">Total Documents</div>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-value">142</div>
          <div className="stat-label">Active Documents</div>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-value">14</div>
          <div className="stat-label">Expired Documents</div>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-value">2.8 GB</div>
          <div className="stat-label">Total Storage</div>
        </StatCard>
      </StatsGrid>

      <ActionsBar>
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Upload size={16} />
          Upload Document
        </ActionButton>
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Folder size={16} />
          Create Folder
        </ActionButton>
        <ActionButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={16} />
          Export All
        </ActionButton>
      </ActionsBar>

      <SearchBar>
        <SearchAndFilter
          data={mockDocuments}
          searchFields={['title', 'description', 'category', 'uploadedBy']}
          filterFields={[
            {
              name: 'category',
              label: 'Category',
              type: 'select',
              options: ['Policies', 'Maintenance', 'Training', 'Templates', 'Compliance', 'Reports']
            },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              options: ['active', 'pending', 'expired']
            },
            {
              name: 'type',
              label: 'File Type',
              type: 'select',
              options: ['PDF', 'Excel', 'Word', 'PowerPoint', 'Image']
            }
          ]}
          placeholder="Search documents by title, description, category, or uploader..."
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          onSuggestionClick={handleSuggestionClick}
          getIcon={getIcon}
          getTitle={getTitle}
          getDetails={getDetails}
          searchQuery={searchQuery}
          filterCriteria={filterCriteria}
          modalTitle="Filter Documents"
        />
        
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
        >
          <Filter size={16} />
          Filter
        </ActionButton>
      </SearchBar>

      <DocumentsGrid>
        {(searchQuery || filterCriteria.category || filterCriteria.status || filterCriteria.type ? filteredDocuments : mockDocuments).map((document, index) => (
          <DocumentCard
            key={document.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <div className="document-header">
              <div>
                <div className="document-title">{document.title}</div>
                <div className="document-meta">
                  <span>📁 {document.category}</span>
                  <span>👤 {document.uploadedBy}</span>
                  <span>📅 {document.uploadedAt}</span>
                  <span>📄 {document.type}</span>
                  <span>💾 {document.size}</span>
                </div>
              </div>
              <div className={`status ${document.status}`}>
                {document.status === 'active' && <Lock size={14} />}
                {document.status === 'expired' && <Calendar size={14} />}
                {document.status === 'pending' && <Clock size={14} />}
                {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
              </div>
            </div>
            <div className="document-description">
              {document.description}
            </div>
            <div className="document-footer">
              <div className="actions">
                <button title="View">
                  <Eye size={14} />
                </button>
                <button title="Download">
                  <Download size={14} />
                </button>
                <button title="Share">
                  <Share size={14} />
                </button>
                <button title="Edit">
                  <Edit size={14} />
                </button>
                <button title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </DocumentCard>
        ))}
      </DocumentsGrid>
    </PageContainer>
  );
};

export default DocumentsPage; 