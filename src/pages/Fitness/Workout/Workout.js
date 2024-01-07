import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import CommonButton from '../../../components/common/CommonButton/CommonButton'
import { workoutData } from './data'
import { workoutStyles } from './styles'
import { globalStyles } from '../../../components/common/styles'

const Workout = ({ maxLifts }) => {
    const [counter, setCounter] = useState(0)

    useEffect(() => {}, [counter])

    const round5 = (x) => {
        return Math.ceil(x / 5) * 5
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
                    <p>{`Week ${workoutData[counter].week} / Day ${workoutData[counter].day}`}</p>
                    <p>{`${workoutData[counter].lift} (Max: ${
                        maxLifts[workoutData[counter].mapping]
                    })`}</p>
                    <Box sx={workoutStyles.allSets}>
                        <Box>
                            <p>{`Set 1: ${round5(
                                workoutData[counter].set1[0] *
                                    maxLifts[workoutData[counter].mapping] *
                                    0.9
                            )}x${workoutData[counter].set1[1]}`}</p>
                            <p>{`Set 2: ${round5(
                                workoutData[counter].set2[0] *
                                    maxLifts[workoutData[counter].mapping] *
                                    0.9
                            )}x${workoutData[counter].set2[1]}`}</p>
                            <p>{`Set 3: ${round5(
                                workoutData[counter].set3[0] *
                                    maxLifts[workoutData[counter].mapping] *
                                    0.9
                            )}x${workoutData[counter].set3[1]}`}</p>
                        </Box>
                        {workoutData[counter].week !== '4' && (
                            <Box sx={workoutStyles.nonWeekFourBox}>
                                <p>{`Set 4: ${round5(
                                    workoutData[counter].set4[0] *
                                        maxLifts[workoutData[counter].mapping] *
                                        0.9
                                )}x${workoutData[counter].set4[1]}`}</p>
                                <p>{`Set 5: ${round5(
                                    workoutData[counter].set5[0] *
                                        maxLifts[workoutData[counter].mapping] *
                                        0.9
                                )}x${workoutData[counter].set5[1]}`}</p>
                                <p>{`Set 6: ${round5(
                                    workoutData[counter].set6[0] *
                                        maxLifts[workoutData[counter].mapping] *
                                        0.9
                                )}x${workoutData[counter].set6[1]}`}</p>
                            </Box>
                        )}
                    </Box>
                </Box>
            </CardContent>
            <CardActions sx={workoutStyles.buttonContainer}>
                <CommonButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (counter > 0 && counter <= 15) {
                            setCounter(counter - 1)
                        }
                    }}
                    sx={globalStyles.button}
                >
                    Previous
                </CommonButton>
                <CommonButton
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (counter >= 0 && counter < 15) {
                            setCounter(counter + 1)
                        }
                    }}
                    sx={globalStyles.button}
                >
                    Next
                </CommonButton>
            </CardActions>
        </Card>
    )
}

export default Workout
