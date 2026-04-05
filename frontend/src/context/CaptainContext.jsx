import React, { createContext, useState } from 'react'

export const CaptainDataContext = createContext()

const CaptainContextProvider = ({ children }) => {

  const [captain, setCaptain] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    },
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      vehicleType: ''
    }
  })

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContextProvider

