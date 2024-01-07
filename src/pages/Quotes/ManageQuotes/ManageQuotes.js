import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { globalStyles } from '../../../components/common/styles'
import React, { useEffect, useState } from 'react'
import backend from '../../../api/backend'
import CommonButton from '../../../components/common/CommonButton/CommonButton'
import { DataGrid } from '@mui/x-data-grid'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'

const ManageQuotes = () => {
    const [allQuotes, setAllQuotes] = useState([])
    const [filteredQuotes, setFilteredQuotes] = useState(allQuotes)
    const [selectedQuotes, setSelectedQuotes] = useState([])
    const [searchText, setSearchText] = useState('')

    const removeQuotes = async () => {
        for (const quoteId of selectedQuotes) {
            try {
                const response = await backend.delete(
                    `/userInfo/${localStorage.getItem(
                        'user_id'
                    )}/deleteQuote/${quoteId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                )
                if (response.status === 200) {
                    console.log(`Successfully deleted quote. Quote=${quoteId}`)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getAllQuotes()
    }

    const getAllQuotes = async () => {
        try {
            const response = await backend.get(
                `/userInfo/${localStorage.getItem('user_id')}/getAllQuotes`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            setAllQuotes(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const isMobile = window.innerWidth <= 768

    useEffect(() => {
        console.log('Getting all quotes...')
        getAllQuotes()
    }, [])

    const columns = [
        {
            field: 'num_views',
            headerName: 'Num Views',
            width: isMobile ? 100 : 100,
        },
        {
            field: 'source',
            headerName: 'Source',
            width: isMobile ? 100 : 200,
            // this is to make the column multi-line
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div style={{ whiteSpace: 'normal', lineHeight: 'normal' }}>
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'quote',
            headerName: 'Quote',
            width: isMobile ? 100 : 800,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div style={{ whiteSpace: 'normal', lineHeight: 'normal' }}>
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },
    ]

    const handleSelectionChange = (selectionModel) => {
        setSelectedQuotes(selectionModel)
    }

    const handleSearch = (event) => {
        setSearchText(event.target.value)
    }

    useEffect(() => {
        const filtered = allQuotes.filter(
            (quoteObj) =>
                quoteObj.quote
                    .toLowerCase()
                    .includes(searchText.toLowerCase()) ||
                quoteObj.source.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredQuotes(filtered)
    }, [searchText, allQuotes])

    return (
        <Card>
            <CardContent>
                <Box
                    component="form"
                    sx={globalStyles.box}
                    autoComplete="off"
                    noValidate
                >
                    <TextField
                        label="Search"
                        sx={globalStyles.textField}
                        value={searchText}
                        onChange={handleSearch}
                    />
                    <DataGrid
                        rows={filteredQuotes}
                        loading={filteredQuotes.length === 0}
                        columns={columns}
                        autoHeight={true}
                        getRowId={(row) => row._id}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15, 20, 25]}
                        checkboxSelection
                        onRowSelectionModelChange={handleSelectionChange}
                    />

                    <CommonButton
                        variant="contained"
                        sx={{
                            backgroundColor: 'red!important',
                            marginTop: '10px',
                        }}
                        onClick={removeQuotes}
                    >
                        Remove Selected
                    </CommonButton>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ManageQuotes
