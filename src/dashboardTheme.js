import { createTheme } from '@mui/material/styles'
import { colors } from './components/common/colors'

export const dashboardTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: 8.5,
                    textTransform: 'none',
                    '&.MuiButton-contained': {
                        backgroundColor: colors.mainBlue,
                        '&:hover': {
                            backgroundColor: colors.hoverBlue,
                        },
                    },
                    '&.MuiButton-outlined': {
                        color: colors.white,
                        borderColor: colors.fadedWhite,
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '1.7rem',
                },
            },
        },
    },
    palette: {
        white: {
            main: colors.white,
        },
    },
    typography: {
        h1: {
            fontSize: '1.6rem',
            fontWeight: 600,
            color: colors.white,
            letterSpacing: '0.5px',
            textTransform: 'capitalize',
        },
    },
})
