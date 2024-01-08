import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { AppBar, Tab, Tabs } from '@mui/material'
import TabPanel from '../../components/common/TabPanel/TabPanel'
import { globalStyles } from '../../components/common/styles'
import AddQuote from './AddQuote/AddQuote'
import ManageQuotes from './ManageQuotes/ManageQuotes'

const Quotes = () => {
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
                    <Tab label="Add" />
                    <Tab label="Manage" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <AddQuote />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ManageQuotes />
            </TabPanel>
        </Grid>
    )
}

export default Quotes
