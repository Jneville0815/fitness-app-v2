import { colors } from '../common/colors'

export const headerStyles = {
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.mainBlue,
        padding: '20px',
    },
    topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topRowRight: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        '*': {
            marginRight: '5px',
        },
    },
    middleRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    link: {
        fontWeight: 500,
        color: colors.fadedWhite,
        '&:hover': {
            color: colors.white,
            cursor: 'pointer',
        },
    },
    webButton: {
        marginRight: '5px',
    },
}
