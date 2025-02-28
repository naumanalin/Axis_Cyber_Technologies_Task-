import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import HomeRoute from './pages/HomeRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoute from './utils/ProtectedRoute'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Analytics from './pages/Analytics'
import Page404 from './pages/Page404'
import './index.css'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <Navbar />
    <div className="mt-10">
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />

      {/* All Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<Home/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/analytics' element={<Analytics/>} />

        <Route path='/login' element={<Navigate to={'/home'} />} />
        <Route path='/signup' element={<Navigate to={'/home'} />} />
      </Route>
 
      <Route path="*" element={<Page404 />} />
    </Routes>
    </div>
    <Footer />
    <ToastContainer />
    </>
  )
}

export default App