import React, { useState } from 'react';
import '../style/SignUp.css'; 
import '../style/popUp.css'; 
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const SignUpForm = () => {
  const [emailId, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [existMessage, setExistMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [verificationCode, setVerificationCode] = useState(''); 
  const [staticId, setStaticId] = useState(''); 
  const [verifiactionSuccessMessage, setVerifiactionSuccessMessage] = useState('');
  const [verifiactionCodeMsg, setVerifiactionCodeMsg] = useState('');
  const navigate = useNavigate();
  //const [closePopup, setClosePopup] = useState(false); 



  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Email:', emailId);
    console.log('Password:', password);
    console.log('Gender:', gender);

    const response = await axios.post(`signUp`, {
      emailId,
      password,
      gender,
    },
  );
  
  const suc = response.data.message;
  const apiData = response.data.data.message;
if(apiData==null){
  setExistMessage(response.data.message);
  setTimeout(() => {
    setExistMessage('');
}, 3000);
}else{
  
  setSuccessMessage(response.data.message);
//   setTimeout(() => {
//     setExistMessage('');
// }, 2000);
}
const id = response.data.data.id;
alert('id lll '+id);
setStaticId(id);
alert('id== '+id)
if(id){
    const response2 = await axios.post(`sendVerificationCode/${id}`, {
      
    },
    );
    if(response2.data==null){
      //alert('inside if = '+)
      setExistMessage('Something went wrong.');
    //   setTimeout(() => {
    //     setExistMessage('');
    // }, 3000);
    }else{
     // alert('else block = '+response.data.message)
      setSuccessMessage(response.data.message);
      setShowPopup(true);
    //   setTimeout(() => {
    //     setExistMessage('');
    // }, 2000);
    }
  }else{
    setSuccessMessage(response.data.message);
  }
};

const submitPopUp = async (e) => {
alert("id=staticId==> "+staticId);
if(verificationCode){
  alert("id=staticId==> "+staticId);

  const response2 = await axios.post(`verifyMail/${staticId}/${verificationCode}`, {
      
  },
  );
  const msg=response2.data.message;
  setVerifiactionSuccessMessage(msg);
  setSuccessPopup(true);
  setShowPopup(false); // Hide popup when close button is clicked

  navigate('/personalInfo'); 

}else{
  setVerifiactionCodeMsg("Please Provide Verification Code...")
}
};
const closeSuccessPopup = () =>{
  setSuccessPopup(false);
}
const closePopUp = () =>{
  setShowPopup(false);
  console.log("id===> "+staticId);
  localStorage.setItem('custId', staticId);
  navigate(`/custPersonalInfo`); 

  // navigate(`/custPersonalInfo/${staticId}`); 
  // <Link to={`/personalInfo/${staticId}}`}> </Link>
}

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            value={emailId}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>

        <button type="submit">Sign Up</button>
        {/* {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>} */}
        {existMessage && <p style={{ color: 'red' }}>{existMessage}</p>}
        {/* {successMessage && <p style={{ color: 'blue' }}></p>} */}
        <p><a href='http://192.168.213.97:3000/login' target='_blank'>Go To Login</a></p>
      </form>


 {/* Popup Component */}
 {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Need To Verify Your Email !</h3>
            <p>We have send verification code to your provided mail.</p>
            <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
            <button onClick={submitPopUp}>Submit</button>
            <button onClick={closePopUp}>Close</button>

            <h3>{verifiactionCodeMsg && <p style={{ color: 'Green' }}>{verifiactionCodeMsg}</p>}</h3>
          </div>
        </div>
      )}

{successPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>{verifiactionSuccessMessage && <p style={{ color: 'Green' }}>{verifiactionSuccessMessage}</p>}</h3>
            <button onClick={closeSuccessPopup}>Close</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default SignUpForm;
