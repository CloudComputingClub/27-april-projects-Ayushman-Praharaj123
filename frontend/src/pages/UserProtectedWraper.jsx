import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'

const UserProtectedWrapper = ({ children }) => {

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const token = localStorage.getItem('token')

    
    if (!token) {
      navigate('/login')
      return
    }

    
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        setUser(response.data.user)
        setLoading(false)
      }
    })
    .catch((err) => {
      console.log(err)
      localStorage.removeItem('token')
      navigate('/login')
    })

  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return children
}

export default UserProtectedWrapper