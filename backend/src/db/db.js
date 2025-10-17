const mongoose = require('mongoose');


function connectDB () {
    mongoose.connect(process.env.MOGO_URI)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((err) => {
        console.log("DB Connection Error", err);
    })
};

module.exports = connectDB;