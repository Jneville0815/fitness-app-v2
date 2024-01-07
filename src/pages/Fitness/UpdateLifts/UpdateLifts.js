import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CommonButton from '../../../components/common/CommonButton/CommonButton'
import { globalStyles } from '../../../components/common/styles'
import * as Yup from 'yup'
import backend from '../../../api/backend'

const UpdateLifts = ({ maxLifts, setMaxLifts }) => {
    const [fitnessSubmitted, setFitnessSubmitted] = useState(false)
    const [fitnessSubmittedLabel, setFitnessSubmittedLabel] = useState('')

    const validationSchema = Yup.object().shape({
        bench: Yup.string()
            .required('Field is empty')
            .min(1, 'Input must be at least one character'),
        overheadPress: Yup.string()
            .required('Field is empty')
            .min(1, 'Input must be at least one character'),
        squat: Yup.string()
            .required('Field is empty')
            .min(1, 'Input must be at least one character'),
        deadlift: Yup.string()
            .required('Field is empty')
            .min(1, 'Input must be at least one character'),
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const updateLifts = async (data) => {
        const newData = {
            benchMax: data.bench,
            deadliftMax: data.deadlift,
            squatMax: data.squat,
            pressMax: data.overheadPress,
        }
        setMaxLifts(newData)
        try {
            const response = await backend.post(
                `/userInfo/${localStorage.getItem('user_id')}/fitness`,
                newData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            if (response.status === 200) {
                setFitnessSubmittedLabel('Updated!')
                setFitnessSubmitted(true)
                setTimeout(() => {
                    setFitnessSubmitted(false)
                }, 2000)
            } else {
                setFitnessSubmittedLabel('Failed to Update')
                setFitnessSubmitted(true)
                setTimeout(() => {
                    setFitnessSubmitted(false)
                }, 2000)
            }
        } catch (err) {
            setFitnessSubmittedLabel('Failed to Update')
            setFitnessSubmitted(true)
            setTimeout(() => {
                setFitnessSubmitted(false)
            }, 2000)
            console.log(err)
        }
    }

    useEffect(() => {
        setValue('bench', maxLifts['benchMax'])
        setValue('deadlift', maxLifts['deadliftMax'])
        setValue('squat', maxLifts['squatMax'])
        setValue('overheadPress', maxLifts['pressMax'])
    })

    return (
        <Card>
            <CardContent>
                <Box
                    component="form"
                    sx={globalStyles.box}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Bench"
                        variant="outlined"
                        margin="dense"
                        {...register('bench')}
                        error={errors.bench ? true : false}
                        helperText={errors.bench?.message}
                    />
                    <TextField
                        label="Overhead Press"
                        variant="outlined"
                        margin="dense"
                        {...register('overheadPress')}
                        error={errors.overheadPress ? true : false}
                        helperText={errors.overheadPress?.message}
                    />
                    <TextField
                        label="Squat"
                        variant="outlined"
                        margin="dense"
                        {...register('squat')}
                        error={errors.squat ? true : false}
                        helperText={errors.squat?.message}
                    />
                    <TextField
                        label="Deadlift"
                        variant="outlined"
                        margin="dense"
                        {...register('deadlift')}
                        error={errors.deadlift ? true : false}
                        helperText={errors.deadlift?.message}
                    />
                    {fitnessSubmitted && (
                        <p
                            style={{
                                color:
                                    fitnessSubmittedLabel === 'Failed to Update'
                                        ? 'red'
                                        : 'green',
                                marginBottom: 0,
                            }}
                        >
                            {fitnessSubmittedLabel}
                        </p>
                    )}
                    <CommonButton
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(updateLifts)}
                        sx={globalStyles.button}
                    >
                        Submit
                    </CommonButton>
                </Box>
            </CardContent>
        </Card>
    )
}

export default UpdateLifts
