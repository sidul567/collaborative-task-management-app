import React from 'react'
import not_found from '../../images/not_found.jpg';
import "./NotFound.css";
import { Link } from 'react-router-dom';
import Header from '../Layout/Header/Header';
 
function NotFound() {
  return (
      <div className="notFoundContainer">
        <div className="illustration">
        <img src={not_found} alt="Not Found Illustration" />
        </div>
        <div className="content">
        <h1>Oops! Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/home">Go Back to Home</Link>
        </div>
    </div>
  )
}

export default NotFound