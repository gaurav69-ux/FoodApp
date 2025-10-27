import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

 const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
     
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const mobile = e.target.mobile.value;
    const password = e.target.password.value;

    const response = await axios.post('http://localhost:3000/api/auth/user/register',{
      fullName,
      email,
      mobile,
      password
    },{
      withCredentials: true
    });

    console.log(response.data);
    navigate('/user/login');



  };


  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">User Registration</h2>
        <div className="form-group">
          <label className="form-label" htmlFor="FullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            className="form-input"
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
          />
        </div>
           <div className="form-group">
          <label className="form-label" htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            className="form-input"
            placeholder="Enter your mobile number"
          />
        </div>
          <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Enter your password"
          />
         </div>
       
        <button type="submit" className="btn">Register</button>
        <div className="auth-link">
          <a href="/user/login">Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
