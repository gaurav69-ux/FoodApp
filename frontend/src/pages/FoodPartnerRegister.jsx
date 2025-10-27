import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

  const FoodPartnerRegister = () => {

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

      const restaurantName = e.target.restaurantName.value;
      const ownerName = e.target.ownerName.value;
      const email = e.target.email.value;
      const mobileNumber = e.target.mobileNumber.value;
      const password = e.target.password.value;
      const address = e.target.address.value;

      const response = await axios.post('http://localhost:3000/api/auth/food-partner/register',{
        restaurantName,
        ownerName,
        email,
        mobileNumber,
        password,
        address
      }, { withCredentials: true });

      console.log(response.data);

        navigate('/food-partner/login');

  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2 className="auth-title">Food Partner Registration</h2>
        <div className="form-group">
          <label className="form-label" htmlFor="restaurantName">Restaurant Name</label>
          <input
            type="text"
            id="restaurantName"
            className="form-input"
            placeholder="Enter restaurant name"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="ownerName">Owner Name</label>
          <input
            type="text"
            id="ownerName"
            className="form-input"
            placeholder="Enter owner name"
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
          <label className="form-label" htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
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
        <div className="form-group">
          <label className="form-label" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            className="form-input"
            placeholder="Enter restaurant address"
          />
        </div>
        <button type="submit" className="btn">Register</button>
        <div className="auth-link">
          <a href="/food-partner/login">Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
};

export default FoodPartnerRegister;
