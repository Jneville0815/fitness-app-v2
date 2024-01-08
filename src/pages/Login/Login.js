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

const Login = () => {
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Field is empty')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Field is empty')
            .min(8, 'Input must be at least eight characters'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const handleLogin = async (data) => {
        let email = data.email
        let password = data.password
        try {
            const response = await backend.post('/user/login', {
                email,
                password,
            })
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user_id', response.data.user_id)
                console.log('Login Success')
                setError(false)
                navigate('home/fitness')
            }
        } catch (err) {
            setError(true)
            console.log('Login failed', err)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user_id = localStorage.getItem('user_id')

        if (token && user_id) {
            navigate('home/fitness')
        }
    })

    return (
        <Box sx={loginStyles.box}>
            <h1>Login Page</h1>
            <TextField
                label="Email"
                variant="outlined"
                margin="dense"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={loginStyles.textField}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="dense"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={loginStyles.textField}
            />
            {error && (
                <p style={loginStyles.error}>Invalid Username Or Password</p>
            )}
            <CommonButton
                variant="contained"
                color="primary"
                onClick={handleSubmit(handleLogin)}
                sx={{ marginTop: '20px' }}
            >
                Submit
            </CommonButton>
        </Box>
    )
}

export default Login
