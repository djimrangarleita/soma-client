import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="pt-24 pb-24 mx-auto px-3 max-w-md">
        <App />
        <Toaster />
      </div>
    </BrowserRouter>
  </StrictMode>
)
