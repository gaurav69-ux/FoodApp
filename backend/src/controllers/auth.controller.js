const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function registerUser (req, res) {

    const { fullName, email, password } = req.body;   //by default req.body is not read the data thats why we provede middleware in app.js
     
    const isUserAlreadyExists = await userModel.findOne({ 
        email
    });

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: 'User already exists'
        });
    } 

  const hashedPassword = await bcrypt.hash(password, 10); //10 is salt value
    
    const user = await userModel.create({
       fullName,
        email,
        password: hashedPassword
    }); 

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET ); // secret key

    res.cookie('token', token );

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });


}

async function loginUser(req, res) { 
    const { email, password } = req.body;

    const user = await userModel.findOne({
         email  // user check krne k liye email exists krta h ya nhi check krenge
    });

    if (!user) {  // agr user nhi mila to
        return res.status(400).json({
            message: "invalid email or password"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password); // jo password user ne dala h wo hashed password se match krna chahiye

    if (!isPasswordCorrect) { // agr password galat h to
        return res.status(400).json({
            message: "invalid email or password"
        });
    }

    const token = jwt.sign({
       id: user._id, // payload (data)  // jo bhi data hume token me rakhna h wo hum yaha rakh skte h
    }, process.env.JWT_SECRET); // secret key

    res.cookie('token', token ); // cookie me token store krna h
    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    });



}

function logoutUser(req, res) { 
    res.clearCookie('token'); // cookie clear krna h
    res.status(200).json({
        message: 'User logged out successfully'
    });
}

async function registerFoodPartner(req, res) {
    const { name, email, password } = req.body;   //by default req.body is not read the data thats why we provede middleware in app.js

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: 'Account already exists'
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //10 is salt value

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET); // secret key

    res.cookie('token', token);

    res.status(201).json({
        message: 'Food Partner registered successfully',
        foodPartner: {
            id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    });
}

async function loginFoodPartner(req, res) {

    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email  // user check krne k liye email exists krta h ya nhi check krenge
    });

    if (!foodPartner) {  // agr user nhi mila to
        return res.status(400).json({
            message: "invalid email or password"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, foodPartner.password); // jo password user ne dala h wo hashed password se match krna chahiye
   
    if (!isPasswordCorrect) { // agr password galat h to
        return res.status(400).json({
            message: "invalid email or password"
        });
    }

    const token = jwt.sign({
        id: foodPartner._id, // payload (data)  // jo bhi data hume token me rakhna h wo hum yaha rakh skte h
    }, process.env.JWT_SECRET); // secret key
   
    res.cookie('token', token); // cookie me token store krna h

    res.status(200).json({
        message: 'Food Partner logged in successfully',
        foodPartner: {
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        }
    });
}

function logoutFoodPartner(req, res) {
    res.clearCookie('token'); // cookie clear krna h
    res.status(200).json({
        message: 'Food Partner logged out successfully'
    });
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
};