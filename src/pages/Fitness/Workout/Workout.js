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
import TextField from '@mui/material/TextField'
import { colors } from '../../../components/common/colors'
import CircularProgress from '@mui/material/CircularProgress'

const Workout = ({ maxLifts }) => {
    const [noteSubmitted, setNoteSubmitted] = useState(false)
    const [noteSubmittedLabel, setNoteSubmittedLabel] = useState('')
    const [currentDay, setCurrentDay] = useState(0)
    const [loading, setLoading] = useState(true)
    const [note, setNote] = useState('')

    const updateCurrentDay = async (day) => {
        try {
            await backend.post(
                `/userInfo/${localStorage.getItem(
                    'user_id'
                )}/fitness/currentDay`,
                {
                    currentDay: day,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            setCurrentDay(day)
        } catch (err) {
            console.log(err)
        }
    }

    const getNote = async () => {
        try {
            const response = await backend.get(
                `/userInfo/${localStorage.getItem('user_id')}/fitness/note`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            setNote(response.data.note)
        } catch (err) {
            console.log(err)
        }
    }

    const updateNote = async () => {
        try {
            const response = await backend.post(
                `/userInfo/${localStorage.getItem('user_id')}/fitness/note`,
                {
                    note: note,
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
                setNoteSubmittedLabel('Updated!')
                setNoteSubmitted(true)
                setTimeout(() => {
                    setNoteSubmitted(false)
                }, 2000)
            } else {
                setNoteSubmittedLabel('Failed to Update')
                setNoteSubmitted(true)
                setTimeout(() => {
                    setNoteSubmitted(false)
                }, 2000)
            }
        } catch (err) {
            setNoteSubmittedLabel('Failed to Update')
            setNoteSubmitted(true)
            setTimeout(() => {
                setNoteSubmitted(false)
            }, 2000)
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
        getCurrentDay().then(() => getNote().then(() => setLoading(false)))
    }, [])

    const round5 = (x) => {
        return Math.ceil(x / 5) * 5
    }

    const handleNote = (event) => {
        setNote(event.target.value)
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
                        <TextField
                            variant="outlined"
                            margin="dense"
                            multiline
                            rows={4}
                            value={note}
                            onChange={handleNote}
                            fullWidth
                        />
                        {noteSubmitted && (
                            <p
                                style={{
                                    color:
                                        noteSubmittedLabel ===
                                        'Failed to Update'
                                            ? colors.red
                                            : colors.green,
                                    marginBottom: 0,
                                }}
                            >
                                {noteSubmittedLabel}
                            </p>
                        )}
                        <CommonButton
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateNote()
                            }}
                            sx={globalStyles.button}
                        >
                            Save Note
                        </CommonButton>
                    </Box>
                </CardContent>
                <CardActions sx={workoutStyles.buttonContainer}>
                    <CommonButton
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            if (currentDay === 0) {
                                updateCurrentDay(15)
                            } else if (currentDay > 0 && currentDay <= 15) {
                                updateCurrentDay(currentDay - 1)
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
                            if (currentDay === 15) {
                                updateCurrentDay(0)
                            } else if (currentDay >= 0 && currentDay < 15) {
                                updateCurrentDay(currentDay + 1)
                            }
                        }}
                        sx={globalStyles.button}
                    >
                        Next
                    </CommonButton>
                </CardActions>
            </Card>
        )
    else {
        return (
            <Box sx={globalStyles.loading}>
                <CircularProgress />
            </Box>
        )
    }
}

export default Workout
