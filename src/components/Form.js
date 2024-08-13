import React, { useState } from 'react';
import './Form.css';

const Form = () => {
    // taking all the values of the form in an object in a useState
    const [userInfo, setUserInfo] = useState({
        username: "",
        email: "",
        mobileNumber: "",
        password: "",        
        confirmPassword: ""  
    });

    // taking useState for updating the error message
    const [userError, setError] = useState({});

    // taking useState for sign up if all the conditions become true
    const [flag, setFlag] = useState(false);


    /** onchange function for form handling and updating the values of the form
    with the key[e.target.name] and value[e.target.value] of the object in the useState

    (...userInfo) spread operator used for making a copy of the object with all current properties 
    and updating it with adding of new property specified by the key and value
    and ensures that the other properties in the object are not lost or modified **/
    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value});
    };

    // onsubmit function for setting up the conditions for form validation
    const submitForm = (e) => {
        e.preventDefault();

        // storing all the error messages in an object in a variable errorMessage
        const errorMessage = {};

        /** all the conditions for form validation **/
        // usernameValidation
        if (!userInfo.username) {
            errorMessage.username = "Please Enter Username";
        } else if (userInfo.username.length > 0 && userInfo.username[0] !== userInfo.username[0].toUpperCase()) {
            errorMessage.username = "First letter should be uppercase";
        } else if (userInfo.username.length <= 2 || userInfo.username.length > 20) {
            errorMessage.username = "Invalid Username";
        }

        // emailValidation
        if (userInfo.email === "") {
            errorMessage.email = "Please Enter Email"; 
        } else if (userInfo.email.indexOf("@") <= 0) {
            errorMessage.email = "`@` in invalid position";
        } else if (!/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(userInfo.email)) {
            errorMessage.email = "Invalid Email Address";
        }

        // mobileNumberValidation
        if (!userInfo.mobileNumber) {
            errorMessage.mobileNumber = "Please Enter Mobile Number";
        } else if (isNaN(userInfo.mobileNumber)) {
            errorMessage.mobileNumber = "Please Enter a Number";
        } else if (userInfo.mobileNumber.length !== 10) {
            errorMessage.mobileNumber = "Mobile Number should be 10 digits";
        }

        // passwordValidation
        if (!userInfo.password) {
            errorMessage.password = "Please Enter Password";
        } else if (userInfo.password.length >= 15 || userInfo.password.length <= 5) {
            errorMessage.password = "Password must be between 6 & 14 characters";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(userInfo.password)) {
            errorMessage.password = "Password must contain at least one special character";
        }

        // confirmPasswordValidation
        if (!userInfo.confirmPassword) {
            errorMessage.confirmPassword = "Please Confirm Password";
        } else if (userInfo.confirmPassword !== userInfo.password) {
            errorMessage.confirmPassword = "Passwords do not match";
        } else {
            setFlag(true);
            
            /** if form submitted and all the validations are valid clear all the input fields
            on clicking the sign up button **/
            setUserInfo({
                username: "",
                email: "",
                mobileNumber: "",
                password: "",        
                confirmPassword: ""  
            })
        }
        setError(errorMessage);
    };

    return (
        <>
            {/* conditional rendering if flag becomes true means 
            if all the validation conditions are true and form is submitted */}
            <h1>{flag ? <p>{userInfo.username}, you have registered successfully</p> : ""}</h1>
            
            <div className='form-container'>
                <form className='form' onSubmit={submitForm}>
                    <div className='form-heading'>
                        <h1>Register Here</h1>
                    </div>
                    <div className='form-group'>
                        <input type='text' placeholder="Username" value={userInfo.username} name='username' onChange={handleChange} autoComplete='off'/>
                        <span style={{color: 'red', fontSize: "12px"}}>{userError.username}</span>
                    </div>

                    <div className='form-group'>
                        <input type='text' placeholder="Email" value={userInfo.email} name='email' onChange={handleChange} autoComplete='off'/>
                        <span style={{color: 'red', fontSize: "12px"}}>{userError.email}</span>
                    </div>

                    <div className='form-group'>
                        <input type='text' placeholder="Mobile Number" value={userInfo.mobileNumber} name='mobileNumber' onChange={handleChange} autoComplete='off'/>
                        <span style={{color: 'red', fontSize: "12px"}}>{userError.mobileNumber}</span>
                    </div>

                    <div className='form-group'>
                        <input type='text' placeholder="Password" value={userInfo.password} name='password' onChange={handleChange} autoComplete='off'/>
                        <span style={{color: 'red', fontSize: "12px"}}>{userError.password}</span>
                    </div>

                    <div className='form-group'>
                        <input type='text' placeholder="Confirm Password" value={userInfo.confirmPassword} name='confirmPassword' onChange={handleChange} autoComplete='off'/>
                        <span style={{color: 'red', fontSize: "12px"}}>{userError.confirmPassword}</span>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
};

export default Form;
