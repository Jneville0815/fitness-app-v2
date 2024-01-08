import React from 'react'
import NotificationBell from '../common/NotificationBell/NotificationBell'
import ClickableAvatar from '../common/ClickableAvatar/ClickableAvatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import { headerStyles } from './styles'

const Header = ({ title, onDrawerToggle }) => {
    return (
        <Box sx={headerStyles.wrapper}>
            <Box sx={headerStyles.topRow}>
                <IconButton onClick={onDrawerToggle} color="white">
                    <MenuIcon />
                </IconButton>
                <Box sx={headerStyles.topRowRight}>
                    <NotificationBell iconColor="white" />
                    <ClickableAvatar />
                </Box>
            </Box>
            <Box sx={headerStyles.middleRow}>
                <Typography variant="h1">{title}</Typography>
            </Box>
        </Box>
    )
}

export default Header
