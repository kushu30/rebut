import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelloGrid } from './HelloGrid';

const root = document.getElementById('root');
if (!root) throw new Error('missing root element');

createRoot(root).render(
  <StrictMode>
    <h1>Rebut</h1>
    <HelloGrid />
  </StrictMode>,
);
