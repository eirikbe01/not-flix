import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import './index.css'
import App from './app/App.tsx'

const qc = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={qc}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
)
