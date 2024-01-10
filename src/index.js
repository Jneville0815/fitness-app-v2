import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Fitness from './pages/Fitness/Fitness'
import Nutrition from './pages/Nutrition/Nutrition'
import Quotes from './pages/Quotes/Quotes'
import Settings from './pages/Settings/Settings'
import Login from './pages/Login/Login'
import { ThemeProvider } from '@mui/material/styles'
import { dashboardTheme } from './dashboardTheme'
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ThemeProvider theme={dashboardTheme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Login />} />
                <Route element={<App />}>
                    <Route path="fitness" element={<Fitness />} />
                    <Route path="nutrition" element={<Nutrition />} />
                    <Route path="quotes" element={<Quotes />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
)
