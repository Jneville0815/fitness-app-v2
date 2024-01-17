import { colors } from '../../components/common/colors'

export const loginStyles = {
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogActions: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    error: { color: colors.red, marginBottom: 0 },
    textField: { width: '25ch' },
}
