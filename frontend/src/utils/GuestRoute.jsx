import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const GuestRoute = () => {
    const isLoggedIn = window.localStorage.getItem('client_a_x_i_s_680') 
    return isLoggedIn ? <Navigate to='/dashboard' replace /> : <Outlet/>
}

export default GuestRoute