import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { globalStyles } from '../../../components/common/styles'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { colors } from '../../../components/common/colors'
import * as Yup from 'yup'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import CommonButton from '../../../components/common/CommonButton/CommonButton'
import backend from '../../../api/backend'

const AddQuote = () => {
    const [quoteSubmitted, setQuoteSubmitted] = useState(false)
    const [quoteSubmittedLabel, setQuoteSubmittedLabel] = useState('')

    const validationSchema = Yup.object().shape({
        source: Yup.string().required('Source is required'),
        quote: Yup.string().required('Quote is required'),
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const addQuote = async (data) => {
        const source = data.source
        const quote = data.quote

        try {
            const response = await backend.post(
                `/userInfo/${localStorage.getItem('user_id')}/addQuote`,
                {
                    source,
                    quote,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            if (response.status === 200) {
                setValue('source', '')
                setValue('quote', '')
                setQuoteSubmittedLabel('Updated!')
                setQuoteSubmitted(true)
                setTimeout(() => {
                    setQuoteSubmitted(false)
                }, 2000)
            } else {
                setQuoteSubmittedLabel('Failed to Update')
                setQuoteSubmitted(true)
                setTimeout(() => {
                    setQuoteSubmitted(false)
                }, 2000)
            }
        } catch (err) {
            setQuoteSubmittedLabel('Failed to Update')
            setQuoteSubmitted(true)
            setTimeout(() => {
                setQuoteSubmitted(false)
            }, 2000)
            console.log(err)
        }
    }

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
                        sx={globalStyles.textField}
                        label="Source"
                        variant="outlined"
                        margin="dense"
                        {...register('source')}
                        error={!!errors.source}
                        helperText={errors.source?.message}
                    />
                    <TextField
                        sx={globalStyles.textField}
                        label="Quote"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="dense"
                        {...register('quote')}
                        error={!!errors.quote}
                        helperText={errors.quote?.message}
                    />
                    <CommonButton
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(addQuote)}
                        sx={globalStyles.button}
                    >
                        Submit
                    </CommonButton>
                    {quoteSubmitted && (
                        <p
                            style={{
                                color:
                                    quoteSubmittedLabel === 'Failed to Update'
                                        ? colors.red
                                        : colors.green,
                                marginBottom: 0,
                            }}
                        >
                            {quoteSubmittedLabel}
                        </p>
                    )}
                </Box>
            </CardContent>
        </Card>
    )
}

export default AddQuote
