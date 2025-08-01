import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/GlobalStyles';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import IncidentReportingPage from './pages/IncidentReportingPage';
import DocumentsPage from './pages/DocumentsPage';
import NotificationsPage from './pages/NotificationsPage';
import AccountPage from './pages/AccountPage';
import JHAPage from './pages/JHAPage';
import EquipmentInspectionPage from './pages/EquipmentInspectionPage';
import SiteAssessmentPage from './pages/SiteAssessmentPage';
import SupportPage from './pages/SupportPage';
import MessagingPage from './pages/MessagingPage';
import TrainingPage from './pages/TrainingPage';
import ToolboxTalksPage from './pages/ToolboxTalksPage';
import ComingSoon from './components/ComingSoon';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: 'white'
      }}>
        Loading...
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (for login page)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Module Pages



















const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout currentModule="Dashboard">
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/employees" element={
          <ProtectedRoute>
            <Layout currentModule="Employees">
              <EmployeesPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/incident-reporting" element={
          <ProtectedRoute>
            <Layout currentModule="Incident Reporting">
              <IncidentReportingPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/documents" element={
          <ProtectedRoute>
            <Layout currentModule="Documents">
              <DocumentsPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/toolbox-talks" element={
          <ProtectedRoute>
            <Layout currentModule="Toolbox Talks">
              <ToolboxTalksPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/training" element={
          <ProtectedRoute>
            <Layout currentModule="Training & Certification">
              <TrainingPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Layout currentModule="Notifications">
              <NotificationsPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/account" element={
          <ProtectedRoute>
            <Layout currentModule="Account">
              <AccountPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/jha" element={
          <ProtectedRoute>
            <Layout currentModule="JHA">
              <JHAPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/support" element={
          <ProtectedRoute>
            <Layout currentModule="Support">
              <SupportPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/equipment-inspection" element={
          <ProtectedRoute>
            <Layout currentModule="Equipment Inspection">
              <EquipmentInspectionPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/site-assessment" element={
          <ProtectedRoute>
            <Layout currentModule="Site Assessment">
              <SiteAssessmentPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/messaging" element={
          <ProtectedRoute>
            <Layout currentModule="Messaging">
              <MessagingPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GlobalStyles />
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
