import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AssessmentProvider } from './context/AssessmentContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AssessmentProvider>
      <App />
    </AssessmentProvider>
  </React.StrictMode>,
);
