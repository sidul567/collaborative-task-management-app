import { Logout, Notifications } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import './Header.css';
import { AuthContext } from '../../../context/AuthContext';
import { Badge, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    const {user, logout} = useContext(AuthContext);
    const [notification, setNotification] = useState(0);
    useEffect(()=>{
        const handleStorage = () => {
            const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
            if(db.teams){
                setNotification(db.teams.filter((team) =>
                team.members.some((member) => member.username === user.username && member.status === "pending")
              ).length);
            }
        } 
        const db = JSON.parse(localStorage.getItem("collaborative-management-app"));
        if(db.teams){
            setNotification(db.teams.filter((team) =>
            team.members.some((member) => member.username === user.username && member.status === "pending")
            ).length);
        }   
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage())
    }, [user.username])

  return (
    <nav>
        <Link to="/home"><h3>Collaborative Management System</h3></Link>
        <div className="profile">
            <Link to="/team">
                <Button variant='outlined' color='inherit' sx={{fontWeight: "600"}}>Team</Button>
            </Link>
            <div className="user"><img src={user.avatar} alt="" /></div>
            <div className="notification">
                <Link to={`/invitation/${user.username}`}>
                    <Badge badgeContent={notification} color="error">
                        <Notifications sx={{color: '#fff'}} />
                    </Badge>
                </Link>
            </div>
            <div className="logout" onClick={logout}><Logout /></div>
        </div>
    </nav>
  )
}

export default Header