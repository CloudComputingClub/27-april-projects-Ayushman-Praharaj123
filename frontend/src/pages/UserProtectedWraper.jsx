import React, {useContext} from 'react'
import { UserDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
const UserProtectedWraper = (
    {children}
) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    if(!token){
        navigate('/login')
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectedWraper
