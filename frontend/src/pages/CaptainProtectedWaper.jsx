import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainProtectedWrapper = ({ children }) => {

  const navigate = useNavigate()
  const { setCaptain } = useContext(CaptainDataContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const token = localStorage.getItem("captainToken")

    if (!token) {
      navigate("/capatin-login")
      return
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/captainProfile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setCaptain(res.data.captain)
      setLoading(false)
    })
    .catch(err => {
      localStorage.removeItem("captainToken")
      navigate("/capatin-login")
    })

  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return children
}

export default CaptainProtectedWrapper