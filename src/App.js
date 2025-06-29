
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login'; // Import your new form component
import Dashboard from './dashboard';
import ForgotPassword from './component/forgot-password.js'; 
import ForgotPasswordAct from './component/forgot-password-actual.js'; 
import SignUp from './component/Signup.js'; 
import AdminLogin from './component/admin-login.js';
import PersonalInfo from './component/personalInfo.js';
import AdminDashBoard from './Admin_Component/admin-dashboard.js';
import AdminSignUp from './Admin_Component/Admin-SignUp.js';
import WatchOtt from './component/watchOtt.js';

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
        <Route path="/forgot-password-actual" element={<ForgotPasswordAct />} /> 
        <Route path="/Signup" element={<SignUp />} /> 
        <Route path="/adminIndex" element={<AdminLogin />} /> 
        <Route path="/adminDashboard" element={<AdminDashBoard />} /> 
        <Route path="/Admin-Signup" element={<AdminSignUp />} /> 
        {/* <Route path="/custPersonalInfo/:id" element={<PersonalInfo />} /> */}
        {/* <Route path="/dashboard/:temp" element={<Dashboard />} /> */}
        {/* <Route path="/custPersonalInfo" element={<PersonalInfo />} /> */}
        <Route path="/custPersonalInfo" element={<PersonalInfo />} /> 
        <Route path="/watch" element={<WatchOtt />} /> 


      </Routes>
    </Router>
  );
}

export default App;
