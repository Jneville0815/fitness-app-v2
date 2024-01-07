import React from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import BasicMenu from '../BasicMenu/BasicMenu'

import { useNavigate } from 'react-router-dom'

const ClickableAvatar = () => {
    const [open, setOpen] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const navigate = useNavigate()

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
    }

    const handleClose = (event) => {
        setOpen(false)
        if (event.target.innerText.includes('Log Out')) {
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            navigate('/')
        }
    }

    return (
        <Box>
            <IconButton onClick={handleOpen}>
                <Avatar src="https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?w=1380&t=st=1704425252~exp=1704425852~hmac=f68c805d9ef1571333c4f492f495d83c931cf547462a3ad679eb78429c414d32" />
            </IconButton>
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={[{ id: 0, label: 'Log Out' }]}
            />
        </Box>
    )
}

export default ClickableAvatar
