const foodPartnerModel = require('../models/foodPartner.model');
const jwt = require('jsonwebtoken');


async function authFoodPartnerMiddleware(req, res, next) {

    const token = req.cookies.token; // cookie se token le rhe h

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized. please login fisrt'
        });
    }

    try { 
       const decoded = jwt.verify(token, process.env.JWT_SECRET ) 

         const foodPartner = await foodPartnerModel.findById(decoded.id);

         req.foodPartner = foodPartner; // req object pr foodPartner add krdia h

            next(); // agr sab kuch thik h to next middleware pr chla jao

    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })

    }
}
 

module.exports = {
    authFoodPartnerMiddleware
}