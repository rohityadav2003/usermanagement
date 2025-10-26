import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../contexts/UsersContext'
import { TextField, Button, Box } from '@mui/material'

export default function AddUser() {
  const { addUser } = useUsers()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })

  const submit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.company) return alert('All fields required')
    addUser({ ...form, company: { name: form.company } })
    navigate('/')
  }

  return (
    <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <TextField label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <TextField label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <TextField label="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      <TextField label="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
      <Button variant="contained" type="submit">Add</Button>
    </Box>
  )
}
