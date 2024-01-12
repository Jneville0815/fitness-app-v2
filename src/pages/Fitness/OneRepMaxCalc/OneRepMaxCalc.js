import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { globalStyles } from '../../../components/common/styles'
import TextField from '@mui/material/TextField'
import CommonButton from '../../../components/common/CommonButton/CommonButton'
import React, { useState } from 'react'

const OneRepMaxCalc = () => {
    const [weight, setWeight] = useState(0)
    const [reps, setReps] = useState(0)
    const [result, setResult] = useState(0)

    const updateWeight = (event) => {
        setWeight(event.target.value)
    }

    const updateReps = (event) => {
        setReps(event.target.value)
    }

    const calculateResult = () => {
        setResult(weight * (1 + reps / 30))
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
                        label="Weight"
                        value={weight}
                        variant="outlined"
                        margin="dense"
                        onChange={updateWeight}
                    />
                    <TextField
                        label="Reps"
                        value={reps}
                        variant="outlined"
                        margin="dense"
                        onChange={updateReps}
                    />
                    {result !== 0 && (
                        <p style={{ fontSize: '25px', marginTop: '50px' }}>
                            {result}
                        </p>
                    )}
                    <CommonButton
                        variant="contained"
                        color="primary"
                        onClick={calculateResult}
                        sx={globalStyles.button}
                    >
                        Calculate
                    </CommonButton>
                </Box>
            </CardContent>
        </Card>
    )
}

export default OneRepMaxCalc
