import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { Tabs, Tab, AppBar } from '@mui/material'
import TabPanel from '../../components/common/TabPanel/TabPanel'
import Workout from './Workout/Workout'
import UpdateLifts from './UpdateLifts/UpdateLifts'
import { globalStyles } from '../../components/common/styles'
import backend from '../../api/backend'
import OneRepMaxCalc from './OneRepMaxCalc/OneRepMaxCalc'

const Fitness = () => {
    const [value, setValue] = useState(0)
    const [maxLifts, setMaxLifts] = useState({
        benchMax: 0,
        deadliftMax: 0,
        squatMax: 0,
        pressMax: 0,
    })

    const retrieveMaxLifts = async () => {
        try {
            const response = await backend.get(
                `/userInfo/${localStorage.getItem('user_id')}/fitness`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            setMaxLifts(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        retrieveMaxLifts()
    }, [])

    return (
        <Grid item xs={12}>
            <AppBar
                component="div"
                position="static"
                elevation={0}
                sx={globalStyles.appBar}
            >
                <Tabs value={value} onChange={handleChange} textColor="inherit">
                    <Tab label="Workout" />
                    <Tab label="Update Lifts" />
                    <Tab label="1RM Calc" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Workout maxLifts={maxLifts} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UpdateLifts maxLifts={maxLifts} setMaxLifts={setMaxLifts} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <OneRepMaxCalc />
            </TabPanel>
        </Grid>
    )
}

export default Fitness
