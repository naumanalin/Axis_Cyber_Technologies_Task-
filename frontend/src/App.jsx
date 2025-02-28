import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import HomeRoute from './pages/HomeRoute'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ProtectedRoute from './utils/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Analytics from './pages/Analytics'
import Page404 from './pages/Page404'
import './index.css'
import Footer from './components/Footer'
import GuestRoute from './utils/GuestRoute';

const App = () => {
  return (
    <>
    <Navbar />
    <div className="pt-20 min-h-screen container">
    <Routes>
      <Route path="/" element={<HomeRoute />} />

      <Route element={<GuestRoute />} >
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>

      {/* All Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/analytics' element={<Analytics/>} />

        <Route path='/login' element={<Navigate to={'/dashboard'} />} />
        <Route path='/signup' element={<Navigate to={'/dashboard'} />} />
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