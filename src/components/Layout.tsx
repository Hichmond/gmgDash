import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import RoleSwitcher from './RoleSwitcher';
import { Module } from '../types';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
`;

const SidebarWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 280px;
  z-index: 50;
  
  @media (max-width: 767px) {
    position: fixed;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &.open {
      transform: translateX(0);
    }
  }
`;

const MainContent = styled(motion.main)<{ $sidebarOpen: boolean }>`
  flex: 1;
  margin-left: ${props => props.$sidebarOpen ? '280px' : '0'};
  max-width: ${props => props.$sidebarOpen ? 'calc(100vw - 280px)' : '100vw'};
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 767px) {
    margin-left: 0;
    max-width: 100vw;
    padding-left: 16px;
  }
`;

const ContentArea = styled.div`
  padding: 24px;
  min-height: 100vh;
  max-width: 100%;
  
  @media (max-width: 767px) {
    padding: 16px;
    padding-top: 80px; // Space for mobile menu button
  }
`;

interface LayoutProps {
  children: React.ReactNode;
  currentModule: Module;
}

const Layout: React.FC<LayoutProps> = ({ children, currentModule }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Start with sidebar open on desktop

  // Force sidebar to stay open on desktop
  const isDesktop = window.innerWidth >= 768;
  const effectiveSidebarOpen = isDesktop ? true : sidebarOpen;

  // Add dashboard-page class to body when component mounts
  React.useEffect(() => {
    document.body.classList.add('dashboard-page');
    return () => {
      document.body.classList.remove('dashboard-page');
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContainer>
      <SidebarWrapper className={effectiveSidebarOpen ? 'open' : ''}>
        <Sidebar 
          isOpen={effectiveSidebarOpen} 
          onToggle={toggleSidebar}
          currentModule={currentModule}
        />
      </SidebarWrapper>
      <MainContent
        $sidebarOpen={effectiveSidebarOpen}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <RoleSwitcher />
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout; 