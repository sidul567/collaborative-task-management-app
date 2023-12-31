import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../images/login.svg';
import './Login.css';
import bcrypt from "bcryptjs-react";
import { AuthContext } from '../../context/AuthContext';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const {login} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLoginInput = (e) => {
        setLoginInfo((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }


    const loginSubmit = async (e) => {
        e.preventDefault();
        let db = JSON.parse(localStorage.getItem("collaborative-management-app"));

        if (db) {
            const user = db.users.find(user => user.username === loginInfo.username);
            if (!user) {
                setError("User not found!");
                return;
            }

            const validPassword = bcrypt.compareSync(loginInfo.password, user.password);

            if(!validPassword){
                setError("Wrong username or password!");
                return;
            }

            setError("");
        } else {
            setError("User not found!");
            return;
        }

        sessionStorage.setItem("username", loginInfo.username);
        login();
        navigate("/home");
    }

    return (
        <div className='loginContainer'>
            <div className="loginWrapper">
                <div className="loginInfo">
                    <h3>Login</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" placeholder='John_Doe' onChange={handleLoginInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder='Enter 6 characters' onChange={handleLoginInput} />
                        </div>
                        <div className="form-submit">
                            <input type="submit" value="Login" />
                        </div>
                        {error && <div className="error">{error}</div>}
                        <p>Don't have an account? <Link to="/registration">Sign Up</Link></p>
                    </form>
                </div>
                <div className="loginImg">
                    <img src={loginImg} alt="Login" />
                </div>
            </div>
        </div>
    )
}

export default Login