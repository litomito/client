import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post("/logout");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            navigate("/");
        } catch (err) {
            console.error("Error logging out:", err);
        }
    }
  

    return( 
        <div className="btn-logout-div">
            <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
        </div>
    )
};


export default Logout;