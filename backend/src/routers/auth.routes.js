const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();


// routher.post('api', controller)  <-- syntax
 // user auth APIs
router.post('/user/register', authController.registerUser);  //(/api/auth/user/register)     //this is API;
router.post('/user/login', authController.loginUser);
router.get('/user/logout', authController.logoutUser);

// food partner auth APIs
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.get('/food-partner/logout', authController.logoutFoodPartner);



module.exports = router;