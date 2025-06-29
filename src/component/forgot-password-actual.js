import React, { useState ,useEffect } from 'react';
import '../style/forgot-password.css'; 
import { useLocation } from 'react-router-dom';

import axios from 'axios';


const ResetPassword = () => {
    const location = useLocation();
   
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [existMessage, setExistMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email'); // Retrieve the email from URL
    if (emailParam) {
      setEmail(emailParam); // Set the email in state
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if both passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Clear the error and send the request (mocking API response for now)
    setError('');

    
        try {
           // const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        

           
            console.log('Going to call the api................');
            alert('email--1234--> '+email)
            console.log("confirmPassword===> "+confirmPassword)
            const response = await axios.post(`updatePassword/${email}`, {
                password,
                confirmPassword,
              },
            );
        
            setSuccessMessage(response.data.message);
            // alert(` ${JSON.stringify(response.data.message)}`);
            // if (response.data.status === 'success') {
            //     setSuccessMessage(response.data.message);
            //     // Reset the password fields
            //     setPassword('');
            //     setConfirmPassword('');
            //   }

            const id = response.data.id;
            if(!id){
              setExistMessage(response.data.message);
              setTimeout(() => {
                setExistMessage('');
            }, 1500);
          }

          } catch (error) {
            setError(`Something Went Wrong...!`);
            alert(`API Call Failed for Button ${confirmPassword}`);
          }
    
    

    // const response = {
    //   data: { message: 'Password reset successfully!', status: 'success' },
    // };

    // Handle the response
   
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        

        <button type="submit">Reset Password</button>
      </form>
      {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
      {existMessage && <p>Go To Login Page <a href='http://localhost:3000/login' target='_blank'>Login</a></p>}
    </div>
  );
};

export default ResetPassword;
