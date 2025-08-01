import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const LoginCard = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: 40px;
  box-shadow: var(--glass-shadow);
  position: relative;
  z-index: 10;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 32px;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 8px;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
  
  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    z-index: 1;
  }
  
  input {
    width: 100%;
    padding-left: 48px;
    height: 48px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--border-radius-sm);
    color: var(--text-primary);
    font-size: 1rem;
    transition: var(--transition);
    
    &::placeholder {
      color: var(--text-muted);
    }
    
    &:focus {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    }
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  z-index: 1;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const LoginButton = styled(motion.button)`
  width: 100%;
  height: 48px;
  background: var(--primary-color);
  border: none;
  border-radius: var(--border-radius-sm);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin: 0;
  }
`;

const ForgotPassword = styled.a`
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-align: center;
  text-decoration: underline;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(255, 107, 107, 0.2);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: var(--border-radius-sm);
  padding: 12px 16px;
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
`;

const DemoInfo = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  h4 {
    color: var(--text-primary);
    margin-bottom: 8px;
    font-size: 0.9rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.8rem;
    line-height: 1.4;
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, isLoading, error } = useAuth();

  // Add login-page class to body when component mounts
  React.useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  // Generate random demo credentials
  const generateRandomCredentials = () => {
    const randomId = Math.random().toString(36).substring(2, 8);
    const randomEmail = `user${randomId}@gmg-demo.com`;
    const randomPassword = `pass${randomId}`;
    setEmail(randomEmail);
    setPassword(randomPassword);
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            GMG EHS Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Environmental Health & Safety Management
          </motion.p>
        </Logo>

                <Form onSubmit={handleSubmit} autoComplete="off">
          {/* Hidden fields to trick password managers */}
          <input type="text" style={{ display: 'none' }} autoComplete="username" />
          <input type="password" style={{ display: 'none' }} autoComplete="current-password" />
          
          {error && (
            <ErrorMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </ErrorMessage>
          )}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <InputGroup>
              <Mail className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                name="demo-email"
                id="demo-email"
              />
            </InputGroup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <InputGroup>
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                data-lpignore="true"
                data-form-type="other"
                name="demo-password"
                id="demo-password"
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputGroup>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <RememberMe>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </RememberMe>
            <ForgotPassword href="#">Forgot password?</ForgotPassword>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <LoginButton
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </LoginButton>
          </motion.div>
        </Form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <DemoInfo>
            <h4>Demo Access</h4>
            <p>
              Use any email and password to sign in. Click the button below to generate random credentials, or use your own.<br/>
              After login, you can switch between different user roles using the role switcher in the sidebar.
            </p>
            <motion.button
              onClick={() => {
                console.log('Generate button clicked');
                generateRandomCredentials();
              }}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem',
                marginRight: '8px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Random Credentials
            </motion.button>
            <motion.button
              type="button"
              onClick={() => {
                console.log('Direct dashboard access clicked');
                // Set a flag in localStorage to indicate user is logged in
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'GMG Admin');
                window.location.href = '/dashboard';
              }}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                background: 'var(--primary-gradient)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginRight: '8px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Direct Dashboard Access
            </motion.button>
            <motion.button
              type="button"
              onClick={() => {
                console.log('Login function called');
                // Call the login function directly
                login('demo@gmg.com', 'demo123').then(() => {
                  console.log('Login successful');
                }).catch((error) => {
                  console.error('Login failed:', error);
                });
              }}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem',
                marginRight: '8px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Login Function
            </motion.button>
            <motion.button
              type="button"
              onClick={() => {
                alert('Test button clicked!');
                console.log('Test button clicked');
              }}
              style={{
                marginTop: '12px',
                padding: '8px 16px',
                background: '#ff6b6b',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Test Button (Alert)
            </motion.button>
          </DemoInfo>
        </motion.div>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage; 