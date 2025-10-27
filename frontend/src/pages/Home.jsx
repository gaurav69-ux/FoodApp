import React from 'react';
import { Link } from 'react-router-dom';
import './AuthPages.css';

const Home = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title" >Welcome to Food App</h2>
        <p style={{ marginBottom: '20px',textAlign: 'center' }}>Choose your registration type:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Link to="/user/register" className="btn" style={{ textDecoration: 'none', textAlign: 'center' }}>Register as Normal User</Link>
          <Link to="/food-partner/register" className="btn" style={{ textDecoration: 'none', textAlign: 'center' }}>Register as Food Partner</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
