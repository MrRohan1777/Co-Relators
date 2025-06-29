import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import '../style/forgot-password.css'; 


const ForgotPassword = () => {
//  const [text, setText] = useState('');

  const [input, setInput] = useState('');
  const [existMessage, setExistMessage] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  

  const handleSubmit = async  (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    
        console.log('Going to call the api................');
        console.log("token===> "+token)
        const response = await axios.post(
          `sendForgotLik/${input}`, // POST request with path parameter
          null, // No request body
          {
            headers: {
              Authorization: token, // Pass token in the Authorization header
            },
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );
    
        //console.log(`Response for Button ${buttonId}:`, response.data);
       // const id = response.data.id;
        
          setExistMessage(response.data.message);
          setTimeout(() => {
            setExistMessage('');
        }, 3000);
      
        //alert(` ${JSON.stringify(response.data.message)}`);
      } catch (error) {
        //console.error(`Error for Button ${buttonId}:`, error.response || error);
        alert(`API Call Failed for Button ${input}`);
      }

};

//   const handleForgotPassword = () => {
//     console.log('Forgot Password clicked!');
//     // You can add navigation logic here if needed
//   };

  return (
    <div
    className='forgot-div'
      style={{
        margin: '1000px right',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '600%',
        maxWidth: '600px',
        padding: '10px',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        height:'200px',
        marginRight: '330px',
       

      }}
      
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Enter your EmailId"
          value={input}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          style={{ marginBottom: '15px' }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ padding: '10px', fontSize: '16px' }}
        >
          Send Link
        </Button>
        {existMessage && <p style={{ color: 'blue' }}>{existMessage}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
