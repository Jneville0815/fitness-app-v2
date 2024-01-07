import React from 'react'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import BasicMenu from '../BasicMenu/BasicMenu'
import Box from '@mui/material/Box'

const NotificationBell = ({ iconColor }) => {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const notifications = [
        // {
        //     id: 0,
        //     label: 'First Notification',
        // },
        // {
        //     id: 1,
        //     label: 'Second Notification',
        // },
        // {
        //     id: 2,
        //     label: 'Third Notification',
        // },
    ]

    const newNotifications = `You have ${notifications.length} new notifications!`
    const noNotifications = 'You have no new notifications'
    return (
        <Box>
            <Tooltip
                title={
                    notifications.length ? newNotifications : noNotifications
                }
            >
                <IconButton
                    color={iconColor}
                    onClick={notifications.length ? handleOpen : null}
                >
                    <Badge badgeContent={notifications.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={notifications}
            />
        </Box>
    )
}

export default NotificationBell
