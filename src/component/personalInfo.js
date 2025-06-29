import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import '../style/personalInfo.css';
import { useLocation,useParams } from 'react-router-dom';

const PersonalInfo = () => {

    // const { id } = useParams();
   const id = localStorage.getItem('custId');
   alert('id==>',id)
     const location = useLocation();
    // const staticId = location.state?.temp;
    // alert('staticId--> '+staticId);
    const [formData, setFormData] = useState({
        id,
        age: '',
        phoneNumber: '',
        city: '',
        firstName: '',
        lastName: '',
        residanceState: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission status
    localStorage.removeItem('custId')
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start the submission process

        // Log the form data (you can remove this after checking)
        // console.log('Form Data:', formData);

        try {
            const response = await fetch('personalInfo', {
                method: 'POST',
                headers: {
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
            setIsSubmitting(false); // End the submission process
        }
    };

    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 
        'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep', 
        'Delhi', 'Puducherry'
    ];

    return (
        <div className="user-form-container">
            <h2>User Information Form</h2>
            <form className="user-form" onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    type="number"
                    fullWidth
                    required
                    margin="normal"
                    inputProps={{ min: 1 }}
                />
                <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    type="tel"
                    inputProps={{
                        // pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
                        title: 'Phone number format: 123-456-7890'
                    }}
                />
                <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                />
                <TextField
                    label="Residence State"
                    name="residanceState"
                    value={formData.residanceState}
                    onChange={handleChange}
                    select
                    fullWidth
                    required
                    margin="normal"
                >
                    {states.map((state, index) => (
                        <MenuItem key={index} value={state}>
                            {state}
                        </MenuItem>
                    ))}
                </TextField>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="submit-button"
                    disabled={isSubmitting}  // Disable button while submitting
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </form>
        </div>
    );
};


export default PersonalInfo;
