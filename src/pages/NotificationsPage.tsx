import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

import { Bell, AlertCircle, CheckCircle, Clock, X, Filter } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

const NotificationsPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Safety Alert',
      message: 'New safety protocol has been updated. Please review the latest guidelines.',
      type: 'warning',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      priority: 'high',
      category: 'Safety'
    },
    {
      id: '2',
      title: 'Training Completed',
      message: 'Your safety training has been completed successfully.',
      type: 'success',
      timestamp: '2024-01-15T09:15:00Z',
      read: true,
      priority: 'medium',
      category: 'Training'
    },
    {
      id: '3',
      title: 'Equipment Maintenance',
      message: 'Scheduled maintenance for equipment #EQ-2024-001 is due next week.',
      type: 'info',
      timestamp: '2024-01-15T08:45:00Z',
      read: false,
      priority: 'medium',
      category: 'Equipment'
    },
    {
      id: '4',
      title: 'Incident Report',
      message: 'A new incident has been reported. Please review and take necessary action.',
      type: 'error',
      timestamp: '2024-01-15T07:30:00Z',
      read: false,
      priority: 'high',
      category: 'Incident'
    },
    {
      id: '5',
      title: 'Certification Expiry',
      message: 'Your safety certification will expire in 30 days. Please renew.',
      type: 'warning',
      timestamp: '2024-01-14T16:20:00Z',
      read: true,
      priority: 'high',
      category: 'Certification'
    }
  ]);

  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>(notifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    type: 'all',
    priority: 'all',
    category: 'all',
    read: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    filterNotifications();
  }, [searchQuery, filterCriteria, notifications]);

  const filterNotifications = () => {
    let filtered = notifications;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (filterCriteria.type !== 'all') {
      filtered = filtered.filter(notification => notification.type === filterCriteria.type);
    }

    // Priority filter
    if (filterCriteria.priority !== 'all') {
      filtered = filtered.filter(notification => notification.priority === filterCriteria.priority);
    }

    // Category filter
    if (filterCriteria.category !== 'all') {
      filtered = filtered.filter(notification => notification.category === filterCriteria.category);
    }

    // Read status filter
    if (filterCriteria.read !== 'all') {
      const isRead = filterCriteria.read === 'read';
      filtered = filtered.filter(notification => notification.read === isRead);
    }

    setFilteredNotifications(filtered);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    setFilterCriteria(filters);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} color="#10b981" />;
      case 'warning':
        return <AlertCircle size={20} color="#f59e0b" />;
      case 'error':
        return <AlertCircle size={20} color="#ef4444" />;
      default:
        return <Bell size={20} color="#3b82f6" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <h1>Notifications</h1>
          <p>Stay updated with important alerts and updates</p>
        </HeaderContent>
        <HeaderActions>
          <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark All as Read
          </Button>
        </HeaderActions>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterButton onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} />
          Filter
        </FilterButton>
      </SearchBar>

      <NotificationsList>
        {filteredNotifications.length === 0 ? (
          <EmptyState>
            <Bell size={48} />
            <h3>No notifications found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </EmptyState>
        ) : (
          filteredNotifications.map(notification => (
            <NotificationItem key={notification.id} unread={!notification.read}>
              <NotificationIcon>
                {getIcon(notification.type)}
              </NotificationIcon>
              <NotificationContent>
                <NotificationHeader>
                  <NotificationTitle>{notification.title}</NotificationTitle>
                  <NotificationTime>{formatTimestamp(notification.timestamp)}</NotificationTime>
                </NotificationHeader>
                <NotificationMessage>{notification.message}</NotificationMessage>
                <NotificationMeta>
                  <PriorityBadge color={getPriorityColor(notification.priority)}>
                    {notification.priority}
                  </PriorityBadge>
                  <CategoryBadge>{notification.category}</CategoryBadge>
                </NotificationMeta>
              </NotificationContent>
              <NotificationActions>
                {!notification.read && (
                  <ActionButton onClick={() => markAsRead(notification.id)}>
                    Mark as Read
                  </ActionButton>
                )}
                <ActionButton danger onClick={() => deleteNotification(notification.id)}>
                  <X size={16} />
                </ActionButton>
              </NotificationActions>
            </NotificationItem>
          ))
        )}
      </NotificationsList>
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
  
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NotificationItem = styled.div<{ unread: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  transition: all 0.2s ease;
  
  ${props => props.unread && `
    border-left: 4px solid var(--primary-color);
    background: rgba(59, 130, 246, 0.05);
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const NotificationIcon = styled.div`
  flex-shrink: 0;
  margin-top: 2px;
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const NotificationTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const NotificationTime = styled.span`
  font-size: 0.875rem;
  color: var(--text-secondary);
  white-space: nowrap;
`;

const NotificationMessage = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 12px;
`;

const NotificationMeta = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PriorityBadge = styled.span<{ color: string }>`
  padding: 4px 8px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const CategoryBadge = styled.span`
  padding: 4px 8px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const NotificationActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

const ActionButton = styled.button<{ danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: none;
  border-radius: 6px;
  background: ${props => props.danger ? '#ef4444' : 'var(--bg-secondary)'};
  color: ${props => props.danger ? 'white' : 'var(--text-primary)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.danger ? '#dc2626' : 'var(--bg-tertiary)'};
  }
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

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
  color: var(--text-secondary);
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 16px 0 8px 0;
  }
  
  p {
    font-size: 0.875rem;
  }
`;

export default NotificationsPage; 