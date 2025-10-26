import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useUsers } from '../contexts/UsersContext'
import { Grid, Card, CardContent, Typography, TextField, Button, CircularProgress, Box } from '@mui/material'

export default function Home() {
  const { users, loading } = useUsers()
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const t = q.toLowerCase()
    return users.filter(u => u.name.toLowerCase().includes(t) || u.email.toLowerCase().includes(t))
  }, [q, users])

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField fullWidth label="Search user" value={q} onChange={e => setQ(e.target.value)} />
        <Button variant="contained" component={Link} to="/add">Add User</Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filtered.map(u => (
            <Grid item xs={12} sm={6} md={4} key={u.id}>
              <Card component={Link} to={`/users/${u.id}`} sx={{ textDecoration: 'none' }}>
                <CardContent>
                  <Typography variant="h6">{u.name}</Typography>
                  <Typography>{u.email}</Typography>
                  <Typography>{u.phone}</Typography>
                  <Typography>{u.company?.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}
