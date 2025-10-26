import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const UsersContext = createContext()

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        const stored = JSON.parse(localStorage.getItem('addedUsers') || '[]')
        setUsers([...res.data, ...stored])
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() }
    setUsers(prev => [...prev, newUser])
    const stored = JSON.parse(localStorage.getItem('addedUsers') || '[]')
    localStorage.setItem('addedUsers', JSON.stringify([...stored, newUser]))
  }

  const getUserById = async (id) => {
    const local = users.find(u => u.id == id)
    if (local) return local
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    return res.data
  }

  return (
    <UsersContext.Provider value={{ users, loading, addUser, getUserById }}>
      {children}
    </UsersContext.Provider>
  )
}

export const useUsers = () => useContext(UsersContext)
