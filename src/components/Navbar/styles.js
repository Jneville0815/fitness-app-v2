import { colors } from '../common/colors'

const drawerWidth = 220

export const navbarStyles = {
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: colors.darkBlue,
            color: colors.fadedWhite,
        },
    },
    icons: {
        color: colors.fadedWhite,
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
