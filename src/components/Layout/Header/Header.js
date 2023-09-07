import { Logout } from '@mui/icons-material'
import React, { useContext, useState } from 'react'
import './Header.css';
import { AuthContext } from '../../../context/AuthContext';

function Header() {
    const {user} = useContext(AuthContext);

  return (
    <nav>
        <h3>Collaborative Management System</h3>
        <div className="profile">
            <div className="user"><img src={user.avatar} alt="" /></div>
            <div className="logout"><Logout /></div>
        </div>
    </nav>
  )
}

export default Header