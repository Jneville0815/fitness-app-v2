const drawerWidth = 220

export const navbarStyles = {
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#101F33',
            color: 'rgba(255,255,255,0.7)',
        },
    },
    icons: {
        color: 'rgba(255, 255, 255, 0.7)!important',
    },
    text: {
        '& span': {
            marginLeft: '-10px',
            fontWeight: '600',
            fontSize: '16px',
        },
    },
    titleText: {
        '& span': {
            fontWeight: '600',
            fontSize: '18px',
            textAlign: 'center',
            marginBottom: '20px',
        },
    },
}
