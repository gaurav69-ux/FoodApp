import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post('http://localhost:3000/api/auth/food-partner/login',{
        email,
        password
      }, { withCredentials: true });

      console.log(response.data);

        navigate('/food-partner/dashboard');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2 className="auth-title">Food Partner Login</h2>
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
          <label className="form-label" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="auth-link">
          <a href="/food-partner/register">Don't have an account? Register</a>
        </div>
      </form>
    </div>
  );
};

export default FoodPartnerLogin;
