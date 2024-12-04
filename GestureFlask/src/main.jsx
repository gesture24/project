import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Anicursor from './components/Anicursor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Anicursor/>
    <App />
  </StrictMode>,
)
