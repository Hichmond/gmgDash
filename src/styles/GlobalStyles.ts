import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    /* Dark Mode Color Palette (Default) */
    --text-primary: #ffffff;
    --text-secondary: #c7c7c7;
    --text-muted: #adb5bd;
    
    --bg-primary: #2e363a;
    --bg-secondary: #56666e;
    --bg-tertiary: #1a1f22;
    
    --primary-color: #667eea;
    --secondary-color: #56666e;
    --success-color: #4facfe;
    --warning-color: #43e97b;
    --danger-color: #fa709a;
    
    --glass-bg: rgba(86, 102, 110, 0.1);
    --glass-border: rgba(199, 199, 199, 0.2);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    
    --border-radius: 16px;
    --border-radius-sm: 8px;
    --border-radius-lg: 24px;
    
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.25);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.3);
    
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Light Mode Color Palette */
  [data-theme="light"] {
    --text-primary: #010c52;
    --text-secondary: #000000;
    --text-muted: #c7c7c7;
    
    --bg-primary: #ffffff;
    --bg-secondary: #f5f6fa;
    --bg-tertiary: #ebedf0;
    
    --primary-color: #010c52;
    --secondary-color: #000000;
    --success-color: #4facfe;
    --warning-color: #43e97b;
    --danger-color: #fa709a;
    
    --glass-bg: rgba(245, 246, 250, 0.95);
    --glass-border: rgba(224, 224, 224, 0.2);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--bg-primary);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
    max-width: 100vw;
  }

  html {
    overflow-x: hidden;
    max-width: 100vw;
  }





  /* Glassmorphism base styles */
  .glass {
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
  }

  .glass-hover {
    transition: var(--transition);
    &:hover {
      background: rgba(245, 246, 250, 0.15);
      border-color: rgba(224, 224, 224, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
    }
  }

  /* Gradient text */
  .gradient-text {
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(245, 246, 250, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(224, 224, 224, 0.3);
    border-radius: 4px;
    &:hover {
      background: rgba(224, 224, 224, 0.5);
    }
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid rgba(105, 128, 140, 0.5);
    outline-offset: 2px;
  }

  /* Button base styles */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    transition: var(--transition);
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  /* Input base styles */
  input, textarea, select {
    font-family: inherit;
    border: none;
    outline: none;
    background: rgba(14, 47, 63, 0.1);
    border-radius: var(--border-radius-sm);
    padding: 12px 16px;
    color: var(--text-primary);
    transition: var(--transition);
    
    &::placeholder {
      color: var(--text-muted);
    }
    
    &:focus {
      background: rgba(14, 47, 63, 0.15);
      box-shadow: 0 0 0 2px rgba(105, 128, 140, 0.3);
    }
  }

  /* Link styles */
  a {
    color: inherit;
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      color: var(--text-secondary);
    }
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .justify-between {
    justify-content: space-between;
  }

  .w-full {
    width: 100%;
  }

  .h-full {
    height: 100%;
  }

  .min-h-screen {
    min-height: 100vh;
  }

  .relative {
    position: relative;
  }

  .absolute {
    position: absolute;
  }

  .fixed {
    position: fixed;
  }

  .z-10 {
    z-index: 10;
  }

  .z-20 {
    z-index: 20;
  }

  .z-30 {
    z-index: 30;
  }

  .z-40 {
    z-index: 40;
  }

  .z-50 {
    z-index: 50;
  }
`; 