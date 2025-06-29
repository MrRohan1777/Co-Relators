import React, { useState } from 'react';
import '../style/Admin.css'; // Importing the CSS file
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contactNo, setContactNo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic for admin login here
        console.log('Admin Login:', { email, password });
    };
    const adminLogin = async () => {
        
        try{
            // API call to the login endpoint
          console.log("api going to call");
          const response = await axios.post('admin/login', {
            email,
            password,
          },
         
        );
        localStorage.setItem('token', response.data.token);
        const token = response.data.token;
          console.log('Token:', token);

          if (token) {
            
            localStorage.setItem('token', token);
            const temp='Y';
            navigate('/adminDashboard', { state: { temp } }); // Redirect after successful login
           // alert('Login successful!');
            
          } 



        }catch{
            
        }


    }
      const handleForgotPassword = async () => {
        navigate('/forgot-password'); // Navigate to Forgot Password page
      };
      const handleSignup = async () => {
        // alert('hello')
         navigate('/Admin-Signup'); // Navigate to Forgot Password page
       };
 


    return (
        <div className="admin-login-container">
            <h1 className="admin-main-name">CO-RELATORS</h1>
            <h2 className="admin-login-title">Admin Login</h2>
            <form className="admin-login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                    
                </div>
                {/* <div className="form-group">
                    <label htmlFor="text">Contact Number:</label>
                    <input
                        type="text"
                        id="text"
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        required
                        className="form-input"
                    />
                    
                </div> */}
                <div className="forgot-pwd">
                    <a href="#" className="forgot-password" onClick={handleForgotPassword}>Forgot your password?</a>
                </div>

                <button type="submit" className="submit-button" onClick={adminLogin}>Login</button>
                <div className="signup-section">
                    <span>Don't have an account? <a href="#" className="forgot-password" onClick={handleSignup}> Sign Up </a></span>
                </div>
            </form>
        </div>
    );
};

export default AdminLogin;
