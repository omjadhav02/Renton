import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
import "leaflet/dist/leaflet.css";
import "./features/map/utils/fixLeafletIcon.js"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  <AuthProvider>
    <Toaster position="top-center"/>
    <App />
  </AuthProvider>
  </QueryClientProvider>
  
)
