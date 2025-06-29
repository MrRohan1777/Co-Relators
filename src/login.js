
import './App.css';
import './component/forgot-password.js'; 
import './component/Signup.js'; 
//import React,{useEffect,useState} from 'react'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

    //const [email, setUsername] = useState('');
   const [password,setPassword] = useState('');
    //const [ setError] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [verifyMessage, setVerifyMessage] = useState(''); 
    const [showVerifyPopUp, setShowVerifyPopUp] = useState(false); 
    const [successPopup, setSuccessPopup] = useState(false);
    const [showVerifyLink, setShowVerifyLink] = useState(false);
    const [showSignInPopUp, setShowSignInPopUp] = useState(false);
    const [verifyButton, setVerifyButton] = useState(false);
    const [verificationCode, setVerificationCode] = useState(''); 
    const [staticId, setStaticId] = useState(''); 
    const [verifiactionSuccessMessage, setVerifiactionSuccessMessage] = useState('');
    const handleSubmit = async (e) => {
        console.log('inside fun======')
        e.preventDefault();
       // setError(''); // Clear previous error messages
    
        try {
          // API call to the login endpoint
          console.log("api going to call");
          const response = await axios.post('user/login', {
            email,
            password,
          },
         
        );
        const id = response.data.id;
        //alert('id ===> '+id);
        if(id){
          setStaticId(id);
        }
        if(!id){
          setVerifyButton(true);
        }
          console.log("api is called");
          localStorage.setItem('token', response.data.token);
          const token = response.data.token;
          console.log('Token:', token);

          const status=response.data.status;
          if(!token && status!='USER'){

            setVerifyMessage(status);
            if(id!=0){
              setShowVerifyLink(true);
              setShowSignInPopUp(true);
              
            }
          //   setTimeout(() => {
          //     setVerifyMessage('');
          // }, 3000);
          }

          if(id==0){
            setShowSignInPopUp(true);
            //setShowVerifyLink(true);
          }

          // Store the JWT token in localStorage
          if (token) {
            
            localStorage.setItem('token', token);
            const temp='Y';
            navigate(`/dashboard`, { state: { temp } }); 
            
          } else {
            console.log('Token not found in headers');
          }
        } catch (err) {
          console.error('Error during login:', err);
          setSuccessMessage('Invalid Credentials...!');
          setTimeout(() => {
            setSuccessMessage('');
        }, 1500);
     
        }
      };

      const handleForgotPassword = async () => {
        navigate('/forgot-password'); // Navigate to Forgot Password page
      };
      const handleSignup = async () => {
       // alert('hello')
        navigate('/Signup'); // Navigate to Forgot Password page
      };
    
     const verificationPopUp = async ()=>{
      //alert('id==> '+staticId+' , code === > '+verificationCode);
      setShowSignInPopUp(false);
      setShowVerifyPopUp(true);
      // const response2 = await axios.post(`verifyMail/${staticId}/${verificationCode}`, {
        
      // },
      // );
      // const msg=response2.data.message;
      // setVerifiactionSuccessMessage(msg);
      // setSuccessPopup(true);
      // //setShowPopup(false); // Hide popup when close button is clicked
      //  setShowVerifyPopUp(false);
     }
     const verificationCodePopUp = async () =>{
      alert('staticId---?? '+staticId);
      const response2 = await axios.post(`verifyMail/${staticId}/${verificationCode}`, {
        
      },
      );
      const msg=response2.data.message;
      setVerifiactionSuccessMessage(msg);
      setShowVerifyPopUp(false);
      setSuccessPopup(true);
      //setShowPopup(false); // Hide popup when close button is clicked
       
     }
     const closeSuccessPopup = () =>{
      setSuccessPopup(false);
      setVerifyMessage('Please Do Login Now.');
      setShowVerifyLink(false);
    }
    const closeSignInPopup = () =>{
      setShowSignInPopUp(false);
    }
    const SignUpPopup = () =>{
      navigate('/Signup');
    }
  return (
      
    
    <div className="login-container">
    <div className="login-card">
    <h1 className="main-name">CO-RELATORS</h1>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
           <div className="forgot-pwd">
          <a href="#" className="forgot-password" onClick={handleForgotPassword}>Forgot your password?</a>
        </div>

      

        <button type="submit" className="login-button" >Sign in</button>
      </form>

      <div className="signup-section">
        <span>Don't have an account? <a href="#" className="forgot-password" onClick={handleSignup}> Sign Up </a></span>
      </div>
      {successMessage && <p style={{ color: 'red' }}>{successMessage}</p>}
      {/* {verifyMessage && <p style={{ color: 'green' }}>{verifyMessage}</p>} */}
      {showVerifyLink && <p style={{ color: 'green' }}>{<a href="#" className="forgot-password" onClick={verificationPopUp}> Verify Now </a>}</p>}
     
      {/* <div className="divider">
        <span>or</span>
      </div>

      <button className="social-button google">
        <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
        Sign in with Google
      </button>

      <button className="social-button facebook">
        <img src="https://img.icons8.com/color/16/000000/facebook-new.png" alt="Facebook" />
        Sign in with Facebook
      </button> */}
    </div>


    {showVerifyPopUp && (
        <div className="popup">
          <div className="popup-content">
            <h3>Need To Verify Your Email !</h3>
            <p>We have send verification code to your mail.</p>
            <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
            <button onClick={verificationCodePopUp}>Submit</button>
          </div>
        </div>
      )}


{successPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{verifiactionSuccessMessage && <p style={{ color: 'Green' }}>{verifiactionSuccessMessage}</p>}</h3>
            <button onClick={closeSuccessPopup}>Submit</button>
          </div>
        </div>
      )}
{showSignInPopUp && (
        <div className="popup">
          <div className="popup-content">
            <h3>{verifyMessage && <p>{verifyMessage}</p>}</h3>
           {verifyButton && <button className="button-spacing" onClick={SignUpPopup}>Sign Up</button> } 
           {!verifyButton && <button className="button-spacing" onClick={verificationPopUp}>Verify</button> }  
            <button className="button-spacing" onClick={closeSignInPopup}>Close</button>
          </div>
        </div>
      )}

  </div>
        
  );
}

export default Login;
	