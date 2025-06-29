import axios from 'axios';
import './style/Dashboard.css'; 
import './style/Track-PopUp.css'; 
import Modal from 'react-modal';
import React, { useState ,useEffect} from 'react';
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import iconImage from './images/netflix-icon.png'
import hotstarIcon from './images/hotstarjpg.jpg'

Modal.setAppElement('#root');
const Dashboard = () => {
  
    const [successMessage, setSuccessMessage] = useState(''); 
    const [messageStatus, setMessageStatus] = useState(''); 
    const [responseData, setResponseData] = useState({ message: '', members: '' });
    const [successPopup, setSuccessPopup] = useState(''); 
    const [trackPopUp, setTrackPopUp] = useState(''); 
    const [showButton, setShowButton] = useState(true);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [platform, setPlatform] = useState(''); 
    const [fullName, setFullName] = useState(''); 
    const [platformPrice, setPlatformPrice] = useState(''); 
    const [contactNumber, setContactNumber] = useState(''); 
    const [emailId, setEmailId] = useState(''); 
    const [paymentId, setPaymentId] = useState(''); 
    const [paymentMethod, setPaymentMethod] = useState(''); 
    const [isPaymentDone, setIsPaymentDOne] = useState(false); 
    const [isUsing, setIsUsing] = useState(false); 

    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const location = useLocation();
    const temp = location.state?.temp; // Access the hidden value
    useEffect(() => {
      if (!temp && temp!=='Y') {
          navigate('/login', { replace: true });
      } 
  }, [token, navigate]);



    const handleButtonClick = async (buttonId) => {

      try {
        //setLoading(true);
        const statusResponse = await axios.get(`getUserStatus/${buttonId}`, {
          headers: {
            Authorization: token,
          },
        });
        setIsUsing(statusResponse.data.isUsing);
        setIsPaymentDOne(statusResponse.data.isPaymentDone);
        const platformVal = statusResponse.data.platform;
        if(isPaymentDone==='Y'){
          setSuccessMessage("Your Payment is done you will get credentials soon.");
          setSuccessPopup(true);
        }
        if((isUsing==='Y') || (isPaymentDone==='Y' && isUsing==='Y')){
          setSuccessMessage("You Are Enjoying "+platformVal);
          setSuccessPopup(true);
        }


      } catch (err) {
        console.error('Error fetching data:', err);
       // setError(err.message); // Set error message if API fails
      }


      if(isUsing==='N' && isPaymentDone==='N'){
        try {
        
            const response = await axios.post(
              `selectPlatform/${buttonId}`, 
              null,
              {
                headers: {
                  Authorization: token,
                },
                withCredentials: true, 
              }
            );
            const { message, members } = response.data; 
            const apimessage =  response.data.data.message;
            setResponseData({ message, members });
            console.log(`Response for Button ${buttonId}:`, response.data);
           setPlatform(buttonId);
           setSuccessMessage(apimessage);
           setSuccessPopup(true);

            
          //   setTimeout(() => {
          //     setSuccessMessage('');
          // }, 3000);
            // messageStatus = response;
            //  alert("messageStatus----> "+messageStatus)
          } catch (error) {
            console.error(`Error for Button ${buttonId}:`, error.response || error);
            setSuccessMessage(` Somethinf Went Wrong..!`);
            setTimeout(() => {
              setSuccessMessage('');
          }, 3000);
            alert(`API Call Failed for Button ${buttonId}`);
          }
        }
    };

    useEffect(() => {
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => console.log('Razorpay SDK loaded for testing.');
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);
  
  
    const paymentHandler = () => {

      setSuccessPopup(false);
        alert("platform : "+platform);
        const fetchData = async () => {
          try {
            //setLoading(true);
    
            const response = await axios.get(`getUserPayInfo/${platform}`, {
              headers: {
                Authorization: token,
              },
            });
            setFullName(response.data.fullName);
            setContactNumber(response.data.contactNumber);
            setEmailId(response.data.emailId);
            setPlatformPrice(response.data.price);
            

          } catch (err) {
            console.error('Error fetching data:', err);
           // setError(err.message); // Set error message if API fails
          } finally {
            //setLoading(false); // Stop loading spinner
          }
        };
    
        fetchData();
  



      if (typeof window.Razorpay === 'undefined') {
        alert('Razorpay SDK not loaded. Please refresh the page.');
        return;
      }
  
      const options = {
        
        key: 'rzp_test_jmzyHAQVJPkvGZ', // Use your Razorpay Test Key
        amount: platformPrice, // 10000 = ₹100 in paisa
        currency: 'INR',
        name: 'Test Company',
        description: 'Test Transaction',
        // image: 'https://via.placeholder.com/150', // Optional: Replace with your logo URL
        handler: function (response) {
          console.log('Test Payment Success:', response); 
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          setPaymentId(response.razorpay_payment_id);
          const menthood = response.method;
          setPaymentMethod(response.method);
          setPaymentSuccess(true);


        },
        prefill: {
          name: fullName,
          email: emailId,
          contact: contactNumber,
        },
        theme: {
          color: '#3399cc',
        },
      };
      // alert(options.amount+" <----ee------")
      const rzp1 = new window.Razorpay(options);
  
      rzp1.on('payment.failed', function (response) {
        console.error('Test Payment Failed:', response.error);
        alert('Payment failed! Try again.');
      });
  
      rzp1.open();
    };
  
    const submitPopUp=() =>{
      setSuccessPopup(false);
    }
    const trackSubmit = () =>{
      setTrackPopUp(true);
    }
    const submitTrackPopUp=()=>{
      setTrackPopUp(false);
    }
    const watchHandle = () =>{
      navigate('/watch');
    }
    const paymentDone = async () =>{
      setPaymentSuccess(false);
      const formData ={
        platform,
        paymentId,
        paymentMethod
      }

      try {
        const response = await fetch('postPayment', {
            method: 'POST',
            headers: {
              Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),  // Send form data as JSON
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        const responseData = await response.json();
        console.log('Response Data:', responseData);  // Handle the response from the API
    } catch (error) {
        console.error('Error:', error);
    } finally {
    }

  



    }



    return (
      <>
        {/* Header Section */}
        <header className="header">
          <h2>Welcome to Co-Relators</h2>
          <img src="/images/file.png" alt="Co-Relators Logo" className="logo" />
          <nav>
            <ul className="nav-links">
              <li><button onClick={trackSubmit}>Track</button></li>
              <li><button>About</button></li>
              <li><button>Contact</button></li>
            </ul>
          </nav>
        </header>
  
        {/* Main Dashboard Section */}
        <div className="dashboard">
          <h1>Choose Your Favourite Platform</h1>
          <div className="button-container">
            <button className="styled-button net-btn" onClick={() => handleButtonClick('net')}>
            <img src={iconImage} alt="icon" className="button-icon" />
            </button>
            <button className="styled-button hots-btn" onClick={() => handleButtonClick('hots')}>
            <img src={hotstarIcon} alt="icon" className="button-icon" />
            </button>  
            
          </div>
          
        </div>

        {/* Popup Component */}
        {successPopup && (
                <div className="popup">
                  <div className="popup-content" >
                    <h3>{successMessage && <p>{successMessage}</p>}</h3>
                   
                    <button onClick={submitPopUp}>Close</button>
                    {/* <button className="styled-button" onClick={paymentHandler}>Pay</button> */}
                    {(isPaymentDone==='N')    && <button  onClick={paymentHandler}>Pay</button> } 
                    {(isPaymentDone==='Y' && isUsing==='Y')    && <button  onClick={watchHandle}>Watch</button> } 
                  </div>
                </div>
              )}

{/* Track-PopUp */}

{trackPopUp && (
                <div className="track-popup">
                  <div className="track-popup-content">
                    <h3> <p>{messageStatus}</p></h3>
                    {showButton && (
                    <div className="button-container">
                        <div className="top-buttons">
                            <button className="button-spacing" onClick={submitTrackPopUp}>Submit</button>
                            <button className="button-spacing" onClick={submitTrackPopUp}>Submit</button>
                        </div>
                        <div className="bottom-button">
                            <button onClick={submitTrackPopUp}>Submit 3</button>
                        </div>
                    </div>
)}

                  </div>
                </div>
              )}
    {/* Payment Success PopUop */}

    {paymentSuccess && (
                <div className="popup">
                  <div className="popup-content" >
                    <h3><p>Payment has been successfullly Done.</p>
                    <p>You will get Credentials through mail soon.</p></h3>
                   
                    <button className="styled-button" onClick={paymentDone}>Ok</button>
                  </div>
                </div>
              )}



      </>
    );
  

};

export default Dashboard;
