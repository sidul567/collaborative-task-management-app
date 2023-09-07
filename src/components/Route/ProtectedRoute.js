import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const {user} = useContext(AuthContext);

    return (
    <>
        {
            user === null ? <Navigate to="/login" /> : <Outlet />
        }
    </>
  )
}

export default ProtectedRoute