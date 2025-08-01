import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 8px;
  
  &:hover {
    background-color: var(--bg-tertiary);
  }
`;

const ToggleButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ToggleLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
`;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleContainer onClick={toggleTheme}>
      <ToggleButton
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </ToggleButton>
      <ToggleLabel>
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </ToggleLabel>
    </ToggleContainer>
  );
};

export default ThemeToggle; 