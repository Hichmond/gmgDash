import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  Smile, 
  MoreHorizontal,
  Bell,
  Volume2,
  VolumeX,
  Video,
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
  Reply,
  Forward,
  Pin,
  Bookmark,
  Archive,
  AtSign,
  Hash,
  Lock,
  Globe,
  Zap,
  Info,
  Check,
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
  Minus,
  Plus
} from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  read: boolean;
}

interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'announcement';
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
}

const MessagingPage: React.FC = () => {
  const { user, hasAccess } = useAuth();
  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({
    type: 'all',
    priority: 'all'
  });

  const channels: Channel[] = [
    { id: 'general', name: 'General', type: 'public', unreadCount: 3, lastMessage: 'Meeting at 2 PM today', lastMessageTime: '10:30 AM' },
    { id: 'safety', name: 'Safety Alerts', type: 'announcement', unreadCount: 1, lastMessage: 'New safety protocol', lastMessageTime: '9:15 AM' },
    { id: 'maintenance', name: 'Maintenance', type: 'public', unreadCount: 0, lastMessage: 'Equipment check completed', lastMessageTime: 'Yesterday' },
    { id: 'training', name: 'Training Updates', type: 'public', unreadCount: 2, lastMessage: 'New course available', lastMessageTime: '2 days ago' },
    { id: 'incidents', name: 'Incident Reports', type: 'private', unreadCount: 5, lastMessage: 'Report submitted', lastMessageTime: '1 hour ago' }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'John Smith',
      content: 'Good morning team! How is everyone doing today?',
      timestamp: '10:30 AM',
      type: 'text',
      read: true
    },
    {
      id: '2',
      sender: 'Sarah Johnson',
      content: 'Morning John! All good here. Working on the safety audit.',
      timestamp: '10:32 AM',
      type: 'text',
      read: true
    },
    {
      id: '3',
      sender: 'Mike Wilson',
      content: 'Has anyone seen the new equipment checklist?',
      timestamp: '10:35 AM',
      type: 'text',
      read: false
    },
    {
      id: '4',
      sender: 'Lisa Brown',
      content: 'I have it. Let me share it with everyone.',
      timestamp: '10:37 AM',
      type: 'text',
      read: false
    }
  ];

  const announcements: Announcement[] = [
    {
      id: '1',
      title: 'New Safety Protocol',
      content: 'Please review the updated safety guidelines for equipment handling.',
      author: 'Safety Manager',
      timestamp: '2024-01-15T09:00:00Z',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Training Session Tomorrow',
      content: 'Mandatory safety training session at 2 PM in Conference Room A.',
      author: 'HR Department',
      timestamp: '2024-01-14T16:30:00Z',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Equipment Maintenance',
      content: 'Scheduled maintenance for all equipment this Friday.',
      author: 'Maintenance Team',
      timestamp: '2024-01-14T14:15:00Z',
      priority: 'low'
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
    return date.toLocaleDateString();
  };

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <h1>Messaging & Announcements</h1>
          <p>Communicate with your team and stay updated with important announcements</p>
        </HeaderContent>
      </Header>

      <MessagingLayout>
        <Sidebar>
          <SidebarHeader>
            <h3>Channels</h3>
            <Button>
              <Plus size={16} />
            </Button>
          </SidebarHeader>
          
          <ChannelList>
            {channels.map(channel => (
              <ChannelItem 
                key={channel.id} 
                active={selectedChannel === channel.id}
                onClick={() => setSelectedChannel(channel.id)}
              >
                <ChannelInfo>
                  <ChannelName>{channel.name}</ChannelName>
                  {channel.lastMessage && (
                    <ChannelLastMessage>{channel.lastMessage}</ChannelLastMessage>
                  )}
                </ChannelInfo>
                <ChannelMeta>
                  {channel.unreadCount > 0 && (
                    <UnreadBadge>{channel.unreadCount}</UnreadBadge>
                  )}
                  {channel.lastMessageTime && (
                    <LastMessageTime>{channel.lastMessageTime}</LastMessageTime>
                  )}
                </ChannelMeta>
              </ChannelItem>
            ))}
          </ChannelList>

          <AnnouncementsSection>
            <h3>Announcements</h3>
            <AnnouncementsList>
              {announcements.map(announcement => (
                <AnnouncementItem key={announcement.id}>
                  <AnnouncementHeader>
                    <AnnouncementTitle>{announcement.title}</AnnouncementTitle>
                    <PriorityBadge color={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </PriorityBadge>
                  </AnnouncementHeader>
                  <AnnouncementContent>{announcement.content}</AnnouncementContent>
                  <AnnouncementMeta>
                    <span>{announcement.author}</span>
                    <span>{formatTimestamp(announcement.timestamp)}</span>
                  </AnnouncementMeta>
                </AnnouncementItem>
              ))}
            </AnnouncementsList>
          </AnnouncementsSection>
        </Sidebar>

        <ChatArea>
          <ChatHeader>
            <ChatHeaderInfo>
              <h2>{channels.find(c => c.id === selectedChannel)?.name}</h2>
              <p>{channels.find(c => c.id === selectedChannel)?.type} channel</p>
            </ChatHeaderInfo>
            <ChatHeaderActions>
              <ActionButton>
                <Phone size={16} />
              </ActionButton>
              <ActionButton>
                <Video size={16} />
              </ActionButton>
              <ActionButton>
                <MoreHorizontal size={16} />
              </ActionButton>
            </ChatHeaderActions>
          </ChatHeader>

          <MessagesContainer>
            {messages.map(msg => (
              <MessageItem key={msg.id}>
                <MessageAvatar>
                  <User size={20} />
                </MessageAvatar>
                <MessageContent>
                  <MessageHeader>
                    <MessageSender>{msg.sender}</MessageSender>
                    <MessageTime>{msg.timestamp}</MessageTime>
                  </MessageHeader>
                  <MessageText>{msg.content}</MessageText>
                </MessageContent>
              </MessageItem>
            ))}
          </MessagesContainer>

          <MessageInputContainer>
            <MessageInputWrapper>
              <MessageInput
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
              />
              <InputActions>
                <ActionButton>
                  <Paperclip size={16} />
                </ActionButton>
                <ActionButton>
                  <Smile size={16} />
                </ActionButton>
                <SendButton onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send size={16} />
                </SendButton>
              </InputActions>
            </MessageInputWrapper>
          </MessageInputContainer>
        </ChatArea>
      </MessagingLayout>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 24px;
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-bottom: 24px;
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

const MessagingLayout = styled.div`
  display: flex;
  height: calc(100vh - 200px);
  gap: 24px;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 300px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ChannelList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChannelItem = styled.div<{ active: boolean }>`
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${props => props.active && `
    background: var(--primary-color);
    color: white;
  `}
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'var(--bg-tertiary)'};
  }
`;

const ChannelInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChannelName = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  margin-bottom: 2px;
`;

const ChannelLastMessage = styled.div`
  font-size: 0.75rem;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChannelMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const UnreadBadge = styled.span`
  background: var(--primary-color);
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 18px;
  text-align: center;
`;

const LastMessageTime = styled.span`
  font-size: 0.75rem;
  opacity: 0.7;
`;

const AnnouncementsSection = styled.div`
  border-top: 1px solid var(--glass-border);
  padding: 20px;
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 16px;
  }
`;

const AnnouncementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AnnouncementItem = styled.div`
  padding: 12px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border-left: 3px solid var(--primary-color);
`;

const AnnouncementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const AnnouncementTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const PriorityBadge = styled.span<{ color: string }>`
  padding: 2px 6px;
  background: ${props => props.color}20;
  color: ${props => props.color};
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const AnnouncementContent = styled.p`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
  line-height: 1.4;
`;

const AnnouncementMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
`;

const ChatHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatHeaderInfo = styled.div`
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  
  p {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
  }
`;

const ChatHeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--bg-tertiary);
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const MessageAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const MessageSender = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

const MessageText = styled.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
`;

const MessageInputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid var(--glass-border);
`;

const MessageInputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  padding: 12px;
`;

const MessageInput = styled.textarea`
  flex: 1;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 0.875rem;
  resize: none;
  min-height: 20px;
  max-height: 100px;
  outline: none;
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const InputActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SendButton = styled.button<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: ${props => props.disabled ? 'var(--bg-secondary)' : 'var(--primary-color)'};
  color: ${props => props.disabled ? 'var(--text-secondary)' : 'white'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export default MessagingPage; 