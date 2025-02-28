import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const isLoggedIn = window.localStorage.getItem('client_a_x_i_s_680')
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute