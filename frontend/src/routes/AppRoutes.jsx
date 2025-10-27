import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';

import FoodPartnerDashboard from '../pages/food-partner/FoodPartnerDashboard'; //after login as food partner
import UserDashboard from '../pages/user/UserDashboard';  // after login as user

function AppRoutes() {
  return (
   <Router>
     <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/food-partner/dashboard" element={<FoodPartnerDashboard />} />

     </Routes>
   </Router>
  )
}

export default AppRoutes
