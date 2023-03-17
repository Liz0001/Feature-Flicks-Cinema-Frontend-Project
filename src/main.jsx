import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"

import App from './App'
import './scss/styles.scss'
import './utilities/auto-key-lists'



ReactDOM.createRoot(document.querySelector('#root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
