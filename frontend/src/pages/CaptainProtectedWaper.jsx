import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainProtectedWrapper = ({ children }) => {

  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem('captainToken')

    if (!token) {
      navigate('/capatin-login')
    }

  }, [])

  return children
}

export default CaptainProtectedWrapper