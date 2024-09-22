import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GirafProvider } from './giraff'
import './assets/styles/global.scss'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GirafProvider>
        <App />
      </GirafProvider>
    </BrowserRouter>
  </React.StrictMode>
)
