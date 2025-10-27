// IN THIS FOLDER WE CREATE SERVER ONLY
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routers/auth.routes');
const foodRoutes = require('./routers/food.routes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());  //middleware to read the data from req.body
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // frontend ka address
    credentials: true
})); // Enable CORS for all routes (you can customize the options as needed

app.get('/', (req, res) => {
    res.send('Hello World!'); 
});

app.use('/api/auth', authRoutes);  //http://localhost:3000/api/auth/user/register
app.use('/api/food', foodRoutes);  //http://localhost:3000/api/food/....
// app.use('/api/food-partner', foodPartnerRoutes)
module.exports = app;