import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import './styles/globals.css';
import './styles/interface.css';

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
