import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CpatinSignup from './pages/CpatinSignup';
import Start from './pages/Start';
import UserProtectedWraper from './pages/UserProtectedWraper';
import UserLogout from './pages/UserLogout';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/capatin-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CpatinSignup />} />
        <Route path='/home' element={<UserProtectedWraper><Home /></UserProtectedWraper>} />
        <Route path='/user/logout' element={<UserProtectedWraper><UserLogout /></UserProtectedWraper>} />
        
      </Routes>
    </div>
  )
}

export default App;
