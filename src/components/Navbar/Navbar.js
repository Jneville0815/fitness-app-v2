import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { mainNavbarItems } from './consts/navbarListItems'
import Divider from '@mui/material/Divider'
import { navbarStyles } from './styles'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    const navigate = useNavigate()

    const { ...other } = props
    return (
        <Drawer
            sx={navbarStyles.drawer}
            variant="permanent"
            anchor="left"
            {...other}
        >
            <List>
                <ListItemText
                    sx={navbarStyles.titleText}
                    primary={'Jimmy Neville Fitness'}
                />
                <Divider />
                {mainNavbarItems.map((item, index) => (
                    <ListItem
                        key={item.id}
                        onClick={() => navigate(item.route)}
                    >
                        <ListItemButton>
                            <ListItemIcon sx={navbarStyles.icons}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                sx={navbarStyles.text}
                                primary={item.label}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Navbar
