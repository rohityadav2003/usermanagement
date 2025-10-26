import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useUsers } from '../contexts/UsersContext'
import { Card, CardContent, Typography, Button, Box, CircularProgress } from '@mui/material'

export default function UserDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getUserById } = useUsers()
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => setUser(await getUserById(id)))()
  }, [id])

  if (!user) return <CircularProgress sx={{ mt: 5 }} />

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Company: {user.company?.name}</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate(-1)}>Back</Button>
      </CardContent>
    </Card>
  )
}
