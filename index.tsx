
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const init = () => {
  const container = document.getElementById('root');
  if (!container) return;
  
  // Clear the fallback loader
  container.innerHTML = ''; 
  
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Vercel friendly execution
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
