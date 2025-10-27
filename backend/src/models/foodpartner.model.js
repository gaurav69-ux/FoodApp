const mongoose = require('mongoose');

const foodPartnerSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },   
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.models.FoodPartner || mongoose.model('FoodPartner', foodPartnerSchema);
