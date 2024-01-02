import React from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';


const LogoutReturnHome = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post("/logout");
            localStorage.removeItem("token");
            navigate("/");
        } catch (err) {
            console.error("Error logging out:", err);
        }
    }
  

    return( 
        <div className="btns-return-home-div">
            <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
            <NavLink className="btn-home" to="/staticposts">Home</NavLink>
        </div>
    )
};


export default LogoutReturnHome;