import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import { globalStyles } from '../../../components/common/styles'
import backend from '../../../api/backend'
import { useEffect, useState } from 'react'

const UserSettings = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const getEmailAndName = async () => {
        try {
            const response = await backend.get(
                `/userInfo/${localStorage.getItem('user_id')}/emailAndName`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )
            if (response.status === 200) {
                setName(response.data.name)
                setEmail(response.data.email)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getEmailAndName()
    }, [])

    return (
        <Card>
            <CardContent>
                <Box
                    component="form"
                    sx={globalStyles.box}
                    noValidate
                    autoComplete="off"
                >
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                </Box>
            </CardContent>
        </Card>
    )
}

export default UserSettings
