import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Header from './components/Header/Header'
import { useLocation } from 'react-router-dom'

function App() {
    const [title, setTitle] = useState(null)
    const location = useLocation()

    const [openDrawer, setOpenDrawer] = useState(false)

    const handleDrawerToggle = () => {
        setOpenDrawer(!openDrawer)
    }

    useEffect(() => {
        const pathSegments = location.pathname.split('/')
        const lastSegment = pathSegments[pathSegments.length - 1]
        const parsedTitle = lastSegment.replace(/\W/g, ' ')
        setTitle(parsedTitle)
    }, [location])

    return (
        <Grid container>
            <Navbar
                variant="temporary"
                open={openDrawer}
                onClose={handleDrawerToggle}
            />
            <Header title={title} onDrawerToggle={handleDrawerToggle} />
            <Outlet />
        </Grid>
    )
}

export default App
