import React, { useState } from 'react';
import '../style/Admin.css'; // Importing the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {

    const navigate = useNavigate();
    const [otp, setOtp] = useState(''); 

    const handleSubmit = (e) => {
        alert('hiii')
    };
   
   


    return (
        <div className="admin-login-container">
            <h1 className="admin-main-name">CO-RELATORS</h1>
            <h2 className="admin-login-title">Enjoy Your Platform</h2>
            <form className="admin-login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">OTP:</label>
                    <input
                        type="number"
                        id="number"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                        
                <button type="submit" className="submit-button" >Login</button>

            </form>
        </div>
    );
};

export default AdminLogin;
