import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Buffer } from 'buffer';
import ActualProject from './ActualProject.tsx';

// @ts-ignore
window.Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActualProject />
  </StrictMode>,
)
