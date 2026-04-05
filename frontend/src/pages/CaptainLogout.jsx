import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CaptainLogout() {

  const navigate = useNavigate()

  useEffect(() => {

    const token = localStorage.getItem('captainToken')

    axios.get(
      `${import.meta.env.VITE_BASE_URL}/captain/logoutcaptain`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => {

      localStorage.removeItem('captainToken')
      navigate('/capatin-login')

    })
    .catch(() => {

      localStorage.removeItem('captainToken')
      navigate('/capatin-login')

    })

  }, [])

  return <div>Logging out Captain...</div>
}

export default CaptainLogout