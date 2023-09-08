import React, { useContext } from 'react'
import Header from '../Layout/Header/Header'
import { AuthContext } from '../../context/AuthContext'
import './Profile.css';

function Profile() {
    const {user} = useContext(AuthContext);
  return (
    <>
        <Header />
        <div className="userProfile">
            <div className="img"><img src={user.avatar} alt="avatar" /></div>
            <h2 className="name"><strong>Username: </strong><span>{user.username}</span></h2>
            <p className='bio'><em>{user.bio}</em></p>
        </div>
    </>
  )
}

export default Profile