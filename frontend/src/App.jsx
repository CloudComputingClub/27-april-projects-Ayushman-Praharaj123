import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CpatinSignup from './pages/CpatinSignup';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path ='/' element ={<Home/>}/>
        <Route path ='/login' element ={<UserLogin/>}/>
        <Route path ='/signup' element ={<UserSignup/>}/>
        <Route path ='/capatin-login' element ={<CaptainLogin/>}/>
        <Route path ='/captain-signup' element ={<CpatinSignup/>}/>
      </Routes>
    </div>
  )
}

export default App;
