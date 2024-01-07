import { createTheme } from '@mui/material/styles'

const theme = createTheme()

export const globalStyles = {
    appBar: {
        zIndex: 0,
        width: '100%',
        backgroundColor: '#009be5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    button: { marginTop: '25px' },
    textField: {
        width: '25ch',
        margin: theme.spacing(1),
    },
}
