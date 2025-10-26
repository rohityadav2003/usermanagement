import React, { useMemo, useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import UserDetails from './pages/UserDetails'
import AddUser from './pages/AddUser'
import { AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ThemeProvider, createTheme } from '@mui/material/styles'

export default function App() {
  const [mode, setMode] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) setMode(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', mode)
  }, [mode])

  const theme = useMemo(
    () => createTheme({ palette: { mode } }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
            User Management Dashboard
          </Typography>
          <IconButton color="inherit" onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}>
            {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/add" element={<AddUser />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}
