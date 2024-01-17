import { useEffect, useState } from 'react'
import CommonButton from '../../components/common/CommonButton/CommonButton'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import backend from '../../api/backend'
import { loginStyles } from './styles'
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Link,
} from '@mui/material'

const Login = () => {
    const [open, setOpen] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [registerError, setRegisterError] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const navigate = useNavigate()

    const loginValidationSchema = Yup.object().shape({
        loginEmail: Yup.string()
            .required('Field is empty')
            .email('Email is invalid'),
        loginPassword: Yup.string()
            .required('Field is empty')
            .min(8, 'Input must be at least eight characters'),
    })

    const {
        register: loginRegister,
        handleSubmit: loginHandleSubmit,
        formState: { errors: loginErrors },
    } = useForm({
        resolver: yupResolver(loginValidationSchema),
    })

    const registerValidationSchema = Yup.object().shape({
        registerEmail: Yup.string()
            .required('Field is empty')
            .email('Email is invalid'),
        registerPassword: Yup.string()
            .required('Field is empty')
            .min(8, 'Input must be at least eight characters'),
        registerConfirmPassword: Yup.string()
            .required('Field is empty')
            .min(8, 'Input must be at least eight characters')
            .oneOf([Yup.ref('registerPassword')], 'Passwords must match'),
        registerName: Yup.string().required('Field is empty'),
    })

    const {
        register: registerRegister,
        handleSubmit: registerHandleSubmit,
        setValue: registerSetValue,
        formState: { errors: registerErrors },
    } = useForm({
        resolver: yupResolver(registerValidationSchema),
    })

    const handleRegister = async (data) => {
        let name = data.registerName
        let email = data.registerEmail
        let password = data.registerPassword

        try {
            const response = await backend.post('/user/register', {
                name,
                email,
                password,
            })
            console.log(response.status)
            if (response.status === 200) {
                console.log('Register Success')
                setRegisterError(false)
                setRegisterSuccess(true)
                setTimeout(() => {
                    handleClose()
                }, 2000)
            }
        } catch (err) {
            console.log('Register failed', err)
            if (err.response.status === 409) {
                setRegisterError(true)
            }
        }
    }

    const handleLogin = async (data) => {
        let email = data.loginEmail
        let password = data.loginPassword
        try {
            const response = await backend.post('/user/login', {
                email,
                password,
            })
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user_id', response.data.user_id)
                console.log('Login Success')
                setLoginError(false)
                navigate('/fitness')
            }
        } catch (err) {
            setLoginError(true)
            console.log('Login failed', err)
        }
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        registerSetValue('registerEmail', '')
        registerSetValue('registerPassword', '')
        registerSetValue('registerConfirmPassword', '')
        registerSetValue('registerName', '')
        setRegisterError(false)
        setRegisterSuccess(false)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user_id = localStorage.getItem('user_id')

        if (token && user_id) {
            navigate('/fitness')
        }
    })

    return (
        <Box sx={loginStyles.box}>
            <h1>Login</h1>
            <TextField
                label="Email"
                variant="outlined"
                margin="dense"
                {...loginRegister('loginEmail')}
                error={!!loginErrors.loginEmail}
                helperText={loginErrors.loginEmail?.message}
                sx={loginStyles.textField}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="dense"
                {...loginRegister('loginPassword')}
                error={!!loginErrors.loginPassword}
                helperText={loginErrors.loginPassword?.message}
                sx={loginStyles.textField}
            />
            {loginError && (
                <p style={loginStyles.error}>Invalid Username Or Password</p>
            )}
            <CommonButton
                variant="contained"
                color="primary"
                onClick={loginHandleSubmit(handleLogin)}
                sx={{ marginTop: '20px' }}
            >
                Submit
            </CommonButton>
            <Link
                onClick={handleClickOpen}
                underline="hover"
                sx={{ marginTop: '20px' }}
            >
                Create Account
            </Link>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Register</DialogTitle>
                <DialogContent sx={loginStyles.box}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        margin="dense"
                        {...registerRegister('registerName')}
                        error={!!registerErrors.registerName}
                        helperText={registerErrors.registerName?.message}
                        sx={loginStyles.textField}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        margin="dense"
                        {...registerRegister('registerEmail')}
                        error={!!registerErrors.registerEmail}
                        helperText={registerErrors.registerEmail?.message}
                        sx={loginStyles.textField}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="dense"
                        {...registerRegister('registerPassword')}
                        error={!!registerErrors.registerPassword}
                        helperText={registerErrors.registerPassword?.message}
                        sx={loginStyles.textField}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        margin="dense"
                        {...registerRegister('registerConfirmPassword')}
                        error={!!registerErrors.registerConfirmPassword}
                        helperText={
                            registerErrors.registerConfirmPassword?.message
                        }
                        sx={loginStyles.textField}
                    />
                    {registerSuccess && (
                        <Alert severity="success" sx={{ marginTop: '20px' }}>
                            Registration Successful!
                        </Alert>
                    )}
                    {registerError && (
                        <p style={loginStyles.error}>Email already exists</p>
                    )}
                </DialogContent>
                <DialogActions sx={loginStyles.dialogActions}>
                    <CommonButton
                        onClick={handleClose}
                        disabled={registerSuccess}
                    >
                        Cancel
                    </CommonButton>
                    <CommonButton
                        onClick={registerHandleSubmit(handleRegister)}
                        disabled={registerSuccess}
                    >
                        Submit
                    </CommonButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Login
