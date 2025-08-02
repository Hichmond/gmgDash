import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Filter,
  SortAsc,
  SortDesc,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  Star,
  Heart,
  Share2,
  Copy,
  Link,
  Lock,
  Unlock,
  Key,
  UserCheck,
  UserX,
  UserPlus,
  UserMinus,
  UserCog,
  UserSearch,
  Settings,
  MessageCircle,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  AlertCircle as AlertCircleIcon,
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
  Tag,
  ThumbsUp,
  ThumbsDown,
  Send,
  Paperclip,
  Smile,
  Reply,
  Forward,
  Pin,
  Bookmark,
  Archive,
  AtSign,
  Hash,
  Bell,
  Volume2,
  VolumeX,
  Video,
  MoreHorizontal,
  Zap,
  Info,
  Check,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  ExternalLink,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Filter as FilterIcon,
  Edit as EditIcon,
  Trash as TrashIcon,
  Eye as EyeIcon,
  Star as StarIcon,
  Lock as LockIcon,
  UserCheck as UserCheckIcon,
  UserX as UserXIcon,
  UserPlus as UserPlusIcon,
  UserMinus as UserMinusIcon,
  UserCog as UserCogIcon,
  UserSearch as UserSearchIcon,
  Send as SendIcon,
  User,
  Users
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  instructor: string;
  status: 'active' | 'inactive' | 'draft';
  enrolledCount: number;
  completionRate: number;
  lastUpdated: string;
}

interface Certification {
  id: string;
  name: string;
  employee: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'expiring_soon';
  category: string;
  issuingAuthority: string;
}

const TrainingPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'certifications'>('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    category: 'all',
    status: 'all',
    instructor: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Safety Fundamentals',
      description: 'Essential safety training covering workplace hazards and prevention measures.',
      category: 'Safety',
      duration: '4 hours',
      instructor: 'Dr. Sarah Johnson',
      status: 'active',
      enrolledCount: 45,
      completionRate: 92,
      lastUpdated: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Equipment Operation',
      description: 'Training on proper operation and maintenance of industrial equipment.',
      category: 'Equipment',
      duration: '6 hours',
      instructor: 'Mike Wilson',
      status: 'active',
      enrolledCount: 32,
      completionRate: 88,
      lastUpdated: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      title: 'Emergency Response',
      description: 'Emergency procedures and first aid training for workplace incidents.',
      category: 'Emergency',
      duration: '3 hours',
      instructor: 'Lisa Brown',
      status: 'active',
      enrolledCount: 28,
      completionRate: 95,
      lastUpdated: '2024-01-13T09:15:00Z'
    },
    {
      id: '4',
      title: 'Hazard Communication',
      description: 'Understanding chemical hazards and safety data sheets.',
      category: 'Safety',
      duration: '2 hours',
      instructor: 'Dr. Sarah Johnson',
      status: 'active',
      enrolledCount: 38,
      completionRate: 85,
      lastUpdated: '2024-01-12T16:45:00Z'
    }
  ];

  const certifications: Certification[] = [
    {
      id: '1',
      name: 'OSHA Safety Certification',
      employee: 'John Smith',
      issueDate: '2023-06-15',
      expiryDate: '2024-06-15',
      status: 'valid',
      category: 'Safety',
      issuingAuthority: 'OSHA'
    },
    {
      id: '2',
      name: 'First Aid Certification',
      employee: 'Sarah Johnson',
      issueDate: '2023-08-20',
      expiryDate: '2024-08-20',
      status: 'valid',
      category: 'Emergency',
      issuingAuthority: 'Red Cross'
    },
    {
      id: '3',
      name: 'Equipment Operator License',
      employee: 'Mike Wilson',
      issueDate: '2023-03-10',
      expiryDate: '2024-03-10',
      status: 'expiring_soon',
      category: 'Equipment',
      issuingAuthority: 'State Licensing Board'
    },
    {
      id: '4',
      name: 'Hazardous Materials Handling',
      employee: 'Lisa Brown',
      issueDate: '2023-01-05',
      expiryDate: '2024-01-05',
      status: 'expired',
      category: 'Safety',
      issuingAuthority: 'DOT'
    }
  ];

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    setFilterCriteria(filters);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const handleCreateCourse = () => {
    console.log('Creating new course');
  };

  const handleViewCourse = (courseId: string) => {
    console.log('Viewing course:', courseId);
  };

  const handleEditCourse = (courseId: string) => {
    console.log('Editing course:', courseId);
  };

  const handleDeleteCourse = (courseId: string) => {
    console.log('Deleting course:', courseId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'inactive':
        return '#6b7280';
      case 'draft':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getCertificationStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return '#10b981';
      case 'expired':
        return '#ef4444';
      case 'expiring_soon':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <h1>Training & Certification</h1>
          <p>Manage training courses and track employee certifications</p>
        </HeaderContent>
        <HeaderActions>
          <Button onClick={handleCreateCourse}>
            <Plus size={16} />
            Create Course
          </Button>
        </HeaderActions>
      </Header>

      <TabContainer>
        <TabButton 
          active={activeTab === 'courses'} 
          onClick={() => setActiveTab('courses')}
        >
          <BookOpen size={16} />
          Courses
        </TabButton>
        <TabButton 
          active={activeTab === 'certifications'} 
          onClick={() => setActiveTab('certifications')}
        >
          <GraduationCap size={16} />
          Certifications
        </TabButton>
      </TabContainer>

      {activeTab === 'courses' && (
        <>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FilterButton onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} />
              Filter
            </FilterButton>
          </SearchBar>

          <CoursesGrid>
            {courses.map(course => (
              <CourseCard key={course.id}>
                <CourseHeader>
                  <CourseTitle>{course.title}</CourseTitle>
                  <StatusBadge color={getStatusColor(course.status)}>
                    {course.status}
                  </StatusBadge>
                </CourseHeader>
                <CourseDescription>{course.description}</CourseDescription>
                <CourseMeta>
                  <MetaItem>
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </MetaItem>
                  <MetaItem>
                    <User size={14} />
                    <span>{course.instructor}</span>
                  </MetaItem>
                  <MetaItem>
                    <Users size={14} />
                    <span>{course.enrolledCount} enrolled</span>
                  </MetaItem>
                </CourseMeta>
                <CourseProgress>
                  <ProgressLabel>Completion Rate</ProgressLabel>
                  <ProgressBar>
                    <ProgressFill width={course.completionRate} />
                  </ProgressBar>
                  <ProgressText>{course.completionRate}%</ProgressText>
                </CourseProgress>
                <CourseActions>
                  <ActionButton onClick={() => handleViewCourse(course.id)}>
                    <Eye size={16} />
                    View
                  </ActionButton>
                  <ActionButton onClick={() => handleEditCourse(course.id)}>
                    <Edit size={16} />
                    Edit
                  </ActionButton>
                  <ActionButton danger onClick={() => handleDeleteCourse(course.id)}>
                    <Trash2 size={16} />
                  </ActionButton>
                </CourseActions>
              </CourseCard>
            ))}
          </CoursesGrid>
        </>
      )}

      {activeTab === 'certifications' && (
        <>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FilterButton onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} />
              Filter
            </FilterButton>
          </SearchBar>

          <CertificationsTable>
            <thead>
              <tr>
                <th>Certification</th>
                <th>Employee</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map(cert => (
                <tr key={cert.id}>
                  <td>
                    <CertificationName>{cert.name}</CertificationName>
                    <CertificationAuthority>{cert.issuingAuthority}</CertificationAuthority>
                  </td>
                  <td>{cert.employee}</td>
                  <td>{formatDate(cert.issueDate)}</td>
                  <td>
                    <ExpiryDate>
                      {formatDate(cert.expiryDate)}
                      {cert.status === 'expiring_soon' && (
                        <ExpiryWarning>
                          {getDaysUntilExpiry(cert.expiryDate)} days left
                        </ExpiryWarning>
                      )}
                    </ExpiryDate>
                  </td>
                  <td>
                    <StatusBadge color={getCertificationStatusColor(cert.status)}>
                      {cert.status.replace('_', ' ')}
                    </StatusBadge>
                  </td>
                  <td>{cert.category}</td>
                  <td>
                    <TableActions>
                      <ActionButton>
                        <Eye size={14} />
                      </ActionButton>
                      <ActionButton>
                        <Edit size={14} />
                      </ActionButton>
                      <ActionButton danger>
                        <Trash2 size={14} />
                      </ActionButton>
                    </TableActions>
                  </td>
                </tr>
              ))}
            </tbody>
          </CertificationsTable>
        </>
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`;

const HeaderContent = styled.div`
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

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const TabButton = styled.button<{ active: boolean }>`
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
  
  ${props => props.active ? `
    background: var(--primary-color);
    color: white;
  ` : `
    background: var(--bg-secondary);
    color: var(--text-primary);
    
    &:hover {
      background: var(--bg-tertiary);
    }
  `}
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const CourseCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const CourseTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  flex: 1;
`;

const StatusBadge = styled.span<{ color: string }>`
  padding: 4px 8px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const CourseDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const CourseMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary);
`;

const CourseProgress = styled.div`
  margin-bottom: 16px;
`;

const ProgressLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 4px;
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  background: var(--primary-color);
  width: ${props => props.width}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-align: right;
`;

const CourseActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.danger ? `
    background: #ef4444;
    color: white;
    
    &:hover {
      background: #dc2626;
    }
  ` : `
    background: var(--bg-secondary);
    color: var(--text-primary);
    
    &:hover {
      background: var(--bg-tertiary);
    }
  `}
`;

const CertificationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  overflow: hidden;
  
  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid var(--glass-border);
  }
  
  th {
    background: var(--bg-tertiary);
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.875rem;
  }
  
  td {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const CertificationName = styled.div`
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

const CertificationAuthority = styled.div`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const ExpiryDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ExpiryWarning = styled.span`
  font-size: 0.75rem;
  color: #f59e0b;
  font-weight: 500;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: var(--glass-border);
  color: var(--text-primary);
  font-size: 0.875rem;
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &:focus {
    outline: none;
    background: rgba(224, 224, 224, 0.3);
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--bg-tertiary);
  }
`;

const TableActions = styled.div`
  display: flex;
  gap: 4px;
`;

export default TrainingPage; 