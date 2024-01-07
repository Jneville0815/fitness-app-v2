import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { AppBar, Tab, Tabs } from '@mui/material'
import TabPanel from '../../components/common/TabPanel/TabPanel'
import UserSettings from './UserSettings/UserSettings'
import { globalStyles } from '../../components/common/styles'

const Settings = () => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Grid item xs={12}>
            <AppBar
                component="div"
                position="static"
                elevation={0}
                sx={globalStyles.appBar}
            >
                <Tabs value={value} onChange={handleChange} textColor="inherit">
                    <Tab label="User Settings" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <UserSettings />
            </TabPanel>
        </Grid>
    )
}

export default Settings
