import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../../images/avatar.png';
import register from '../../images/register.svg';
import './Registration.css';
import bcrypt from "bcryptjs-react";
import { AuthContext } from '../../context/AuthContext';

function Registration() {
    const [registrationInfo, setRegistrationInfo] = useState({
        username: "",
        bio: "",
        password: "",
        avatar: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const {login} = useContext(AuthContext);

    const handleRegistrationInput = (e) => {
        setRegistrationInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setRegistrationInfo({
                        ...registrationInfo,
                        [e.target.name]: reader.result,
                    })
                }
            }
            reader.readAsDataURL(file);
        }
    }

    const registrationSubmit = async (e) => {
        e.preventDefault();

        if(registrationInfo.password.length < 6){
            setError("Password must be at least 6 character!");
            return;
        }else{
            registrationInfo.password = bcrypt.hashSync(registrationInfo.password, 10);
        }

        let db = JSON.parse(localStorage.getItem("collaborative-management-app"));

        if(db){
            const isFoundUsername = db.users.find(user=>user.username === registrationInfo.username);
            if(isFoundUsername){
                setError("Username already exists!");
                return;
            }else{
                setError("");
                const users = [...db.users, registrationInfo];
                localStorage.setItem("collaborative-management-app", JSON.stringify({...db, users})); 
            }
        }else{
            setError("");
            localStorage.setItem("collaborative-management-app", JSON.stringify({users: [{...registrationInfo}]}));    
        }
        
        sessionStorage.setItem("username", registrationInfo.username);
        login();
        navigate("/home");
    }

    return (
        <div className='registrationContainer'>
            <div className="registrationWrapper">
                <div className="registrationInfo">
                    <h3>Registration</h3>
                    <form onSubmit={registrationSubmit} encType='multipart/form-data'>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder='John_Doe' onChange={handleRegistrationInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">BIO</label>
                            <textarea type="text" name="bio" placeholder='Enter your BIO' rows={3} onChange={handleRegistrationInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder='Enter 6 characters' min="6" onChange={handleRegistrationInput} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="avatar">Avatar</label>
                            <div className="wrapper">
                                <input type="file" name="avatar" onChange={handleImageChange} required />
                                <div className="avatar">
                                    <img src={registrationInfo.avatar || avatar} alt="Avatar" />
                                </div>
                            </div>
                        </div>
                        <div className="form-submit">
                            <input type="submit" value="Sign Up" />
                        </div>
                        {error && <div className="error">{error}</div>}
                        <p>Already have an account? <Link to="/">Log In</Link></p>
                    </form>
                </div>
                <div className="registrationImg">
                    <img src={register} alt="Register" />
                </div>
            </div>
        </div>
    )
}

export default Registration