import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Box from '@mui/material/Box'
import CommonButton from '../../../components/common/CommonButton/CommonButton'
import { workoutData } from './data'
import { workoutStyles } from './styles'
import { globalStyles } from '../../../components/common/styles'
import backend from '../../../api/backend'

const Workout = ({ maxLifts }) => {
    const [currentDay, setCurrentDay] = useState(0)
    const [loading, setLoading] = useState(true)

    const updateCurrentDay = async () => {
        try {
            await backend.post(
                `/userInfo/${localStorage.getItem(
                    'user_id'
                )}/fitness/currentDay`,
                {
                    currentDay: currentDay,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
        } catch (err) {
            console.log(err)
        }
    }

    const getCurrentDay = async () => {
        try {
            const response = await backend.get(
                `/userInfo/${localStorage.getItem(
                    'user_id'
                )}/fitness/currentDay`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            setCurrentDay(response.data.currentDay)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        updateCurrentDay()
    }, [currentDay])

    useEffect(() => {
        getCurrentDay().then(() => setLoading(false))
    }, [])

    const round5 = (x) => {
        return Math.ceil(x / 5) * 5
    }

    if (!loading)
        return (
            <Card>
                <CardContent>
                    <Box
                        component="form"
                        sx={globalStyles.box}
                        noValidate
                        autoComplete="off"
                    >
                        <p>{`Week ${workoutData[currentDay].week} / Day ${workoutData[currentDay].day}`}</p>
                        <p>{`${workoutData[currentDay].lift} (Max: ${
                            maxLifts[workoutData[currentDay].mapping]
                        })`}</p>
                        <Box sx={workoutStyles.allSets}>
                            <Box>
                                <p>{`Set 1: ${round5(
                                    workoutData[currentDay].set1[0] *
                                        maxLifts[
                                            workoutData[currentDay].mapping
                                        ] *
                                        0.9
                                )}x${workoutData[currentDay].set1[1]}`}</p>
                                <p>{`Set 2: ${round5(
                                    workoutData[currentDay].set2[0] *
                                        maxLifts[
                                            workoutData[currentDay].mapping
                                        ] *
                                        0.9
                                )}x${workoutData[currentDay].set2[1]}`}</p>
                                <p>{`Set 3: ${round5(
                                    workoutData[currentDay].set3[0] *
                                        maxLifts[
                                            workoutData[currentDay].mapping
                                        ] *
                                        0.9
                                )}x${workoutData[currentDay].set3[1]}`}</p>
                            </Box>
                            {workoutData[currentDay].week !== '4' && (
                                <Box sx={workoutStyles.nonWeekFourBox}>
                                    <p>{`Set 4: ${round5(
                                        workoutData[currentDay].set4[0] *
                                            maxLifts[
                                                workoutData[currentDay].mapping
                                            ] *
                                            0.9
                                    )}x${workoutData[currentDay].set4[1]}`}</p>
                                    <p>{`Set 5: ${round5(
                                        workoutData[currentDay].set5[0] *
                                            maxLifts[
                                                workoutData[currentDay].mapping
                                            ] *
                                            0.9
                                    )}x${workoutData[currentDay].set5[1]}`}</p>
                                    <p>{`Set 6: ${round5(
                                        workoutData[currentDay].set6[0] *
                                            maxLifts[
                                                workoutData[currentDay].mapping
                                            ] *
                                            0.9
                                    )}x${workoutData[currentDay].set6[1]}`}</p>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </CardContent>
                <CardActions sx={workoutStyles.buttonContainer}>
                    <CommonButton
                        variant="contained"
                        color="primary"
                        disabled={currentDay === 0}
                        onClick={() => {
                            if (currentDay > 0 && currentDay <= 15) {
                                setCurrentDay(currentDay - 1)
                            }
                        }}
                        sx={globalStyles.button}
                    >
                        Previous
                    </CommonButton>
                    <CommonButton
                        variant="contained"
                        color="primary"
                        disabled={currentDay === 15}
                        onClick={() => {
                            if (currentDay >= 0 && currentDay < 15) {
                                setCurrentDay(currentDay + 1)
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
