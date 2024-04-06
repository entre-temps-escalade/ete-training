import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from '@/routes/router'
import './index.css'
import { AppProvider } from './context/AppContext'
import '@theo-posty/betterjs'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppProvider>
            <Router />
        </AppProvider>
    </React.StrictMode>,
)
