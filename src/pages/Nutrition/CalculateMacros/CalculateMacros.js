import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import TextField from '@mui/material/TextField'
import { FormControl, InputLabel, Select } from '@mui/material'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CommonButton from '../../../components/common/CommonButton/CommonButton'
import { calculateMacrosStyles } from './styles'
import { globalStyles } from '../../../components/common/styles'

const CalculateMacros = () => {
    const [calculatedMacros, setCalculatedMacros] = useState({
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
    })
    const [calculationSubmitted, setCalculationSubmitted] = useState(false)

    const validationSchema = Yup.object().shape({
        age: Yup.number()
            .typeError('Input must be a number')
            .min(16, 'Number must be greater than or equal to 16')
            .max(80, 'Number must be less than or equal to 80')
            .required('Number is required'),
        sex: Yup.number(),
        heightFeet: Yup.number(),
        heightInches: Yup.number(),
        weight: Yup.number()
            .typeError('Input must be a number')
            .min(100, 'Number must be greater than or equal to 100')
            .max(400, 'Number must be less than or equal to 400')
            .required('Number is required'),
        goal: Yup.number(),
        activityLevel: Yup.number(),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    })

    const calculateMacros = (data) => {
        let calories = 0
        let fat = 0
        let carbs = 0
        let protein = 0

        let height = data.heightFeet * 30.48 + data.heightInches * 2.54

        let orgWeight = data.weight
        let weight = orgWeight * 0.453592

        let age = data.age
        let sex = data.sex
        let activityLevel = data.activityLevel
        let goal = data.goal

        if (sex === 0) {
            // male
            calories = weight * 10 + height * 6.25 - age * 5 + 5
        } else {
            // female
            calories = weight * 10 + height * 6.25 - age * 5 - 161
        }

        switch (activityLevel) {
            case 0:
                calories = Math.round(calories * 1.2)
                break
            case 1:
                calories = Math.round(calories * 1.375)
                break
            case 2:
                calories = Math.round(calories * 1.466)
                break
            case 3:
                calories = Math.round(calories * 1.55)
                break
            case 4:
                calories = Math.round(calories * 1.725)
                break
            case 5:
                calories = Math.round(calories * 1.9)
                break
        }

        switch (goal) {
            case 0:
                if (calories <= 2000) calories = Math.round(0.9 * calories)
                if (calories > 2000) calories = Math.round(0.8 * calories)
                fat = Math.round(orgWeight * 0.3)
                break
            case 1:
                fat = Math.round(orgWeight * 0.4)
                break
            case 2:
                calories += 200
                fat = Math.round(orgWeight * 0.5)
                break
        }

        protein = orgWeight
        let pCalories = protein * 4
        let fCalories = fat * 9
        let pfCalories = pCalories + fCalories

        carbs = Math.round((calories - pfCalories) / 4)

        setCalculatedMacros({
            ...calculatedMacros,
            calories,
            fat,
            protein,
            carbs,
        })
        setCalculationSubmitted(true)
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
                        label="Age"
                        variant="outlined"
                        margin="dense"
                        {...register('age')}
                        error={errors.age ? true : false}
                        helperText={errors.age?.message}
                    />
                    <FormControl sx={globalStyles.textField}>
                        <InputLabel>Sex</InputLabel>
                        <Select
                            label="Sex"
                            displayEmpty
                            {...register('sex')}
                            defaultValue=""
                            error={errors.sex ? true : false}
                        >
                            <MenuItem value={0}>Male</MenuItem>
                            <MenuItem value={1}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <Box>
                        <FormControl sx={calculateMacrosStyles.heightField}>
                            <InputLabel>Height (ft)</InputLabel>
                            <Select
                                label="Height (ft)"
                                {...register('heightFeet')}
                                defaultValue=""
                                error={errors.heightFeet ? true : false}
                            >
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={calculateMacrosStyles.heightField}>
                            <InputLabel>Height (in)</InputLabel>
                            <Select
                                label="Height (in)"
                                {...register('heightInches')}
                                defaultValue=""
                                error={errors.heightInches ? true : false}
                            >
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={11}>11</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        label="Weight"
                        variant="outlined"
                        margin="dense"
                        {...register('weight')}
                        error={errors.weight ? true : false}
                        helperText={errors.weight?.message}
                        sx={globalStyles.textField}
                    />
                    <FormControl sx={globalStyles.textField}>
                        <InputLabel>Goal</InputLabel>
                        <Select
                            label="Goal"
                            {...register('goal')}
                            defaultValue=""
                            error={errors.goal ? true : false}
                        >
                            <MenuItem value={0}>Fat Loss</MenuItem>
                            <MenuItem value={1}>Maintenance</MenuItem>
                            <MenuItem value={2}>Gain Muscle</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={globalStyles.textField}>
                        <InputLabel>Activity Level</InputLabel>
                        <Select
                            label="Activity Level"
                            {...register('activityLevel')}
                            defaultValue=""
                            error={errors.activityLevel ? true : false}
                        >
                            <MenuItem value={0}>None</MenuItem>
                            <MenuItem value={1}>1-3 times per week</MenuItem>
                            <MenuItem value={2}>4-5 times per week</MenuItem>
                            <MenuItem value={3}>Daily Moderate</MenuItem>
                            <MenuItem value={4}>Daily Intense</MenuItem>
                            <MenuItem value={5}>
                                24/7 365 Bout That Life
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {calculationSubmitted && (
                        <Box sx={calculateMacrosStyles.submittedBox}>
                            <Typography>
                                Calories: {calculatedMacros.calories}
                            </Typography>
                            <Typography>
                                Protein: {calculatedMacros.protein}
                            </Typography>
                            <Typography>
                                Carbs: {calculatedMacros.carbs}
                            </Typography>
                            <Typography>Fat: {calculatedMacros.fat}</Typography>
                        </Box>
                    )}
                    <CommonButton
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit(calculateMacros)}
                        sx={globalStyles.button}
                    >
                        Submit
                    </CommonButton>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CalculateMacros
