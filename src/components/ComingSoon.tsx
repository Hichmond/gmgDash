import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Clock, Sparkles, ArrowRight } from 'lucide-react';
import { Module } from '../types';

const ComingSoonContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  padding: 60px 20px;
`;

const IconContainer = styled(motion.div)`
  width: 120px;
  height: 120px;
  margin: 0 auto 32px;
  background: var(--primary-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
`;

const Subtitle = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: 32px;
  line-height: 1.6;
`;

const FeaturesList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 32px 0;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-sm);
  color: var(--text-primary);
  
  .feature-icon {
    width: 24px;
    height: 24px;
    color: #4ade80;
  }
  
  .feature-text {
    flex: 1;
    text-align: left;
  }
`;

const ProgressBar = styled(motion.div)`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 24px 0;
  
  .progress-fill {
    height: 100%;
    background: var(--primary-gradient);
    border-radius: 4px;
    width: 75%;
  }
`;

const ProgressText = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 24px;
`;

const BackButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius-sm);
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
`;

interface ComingSoonProps {
  moduleName: Module;
  description?: string;
  features?: string[];
  progress?: number;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ 
  moduleName, 
  description = "This module is currently under development and will be available soon.",
  features = [
    "Advanced reporting and analytics",
    "Real-time data synchronization",
    "Mobile-responsive design",
    "Role-based access control"
  ],
  progress = 75
}) => {
  return (
    <ComingSoonContainer>
      <IconContainer
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        <Clock size={48} />
      </IconContainer>

      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {moduleName}
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </Subtitle>

      <ProgressBar
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <motion.div 
          className="progress-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ delay: 0.8, duration: 1 }}
        />
      </ProgressBar>

      <ProgressText>
        Development Progress: {progress}%
      </ProgressText>

      <FeaturesList
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            <Sparkles className="feature-icon" size={20} />
            <div className="feature-text">{feature}</div>
          </FeatureItem>
        ))}
      </FeaturesList>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <BackButton
          onClick={() => window.history.back()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight size={20} />
          Back to Dashboard
        </BackButton>
      </motion.div>
    </ComingSoonContainer>
  );
};

export default ComingSoon; 