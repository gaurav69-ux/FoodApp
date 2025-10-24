const fooModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4:uuid } = require('uuid');
const multer = require('multer');
const foodModel = require('../models/food.model');


async function createFood(req, res) {

      // console.log(req.foodPartner);
      // console.log(req.body);
      // console.log(req.file);    // multer se file mil rhi h

// if file is not upload then show this error
      // if (!req.file) {
      //     return res.status(400).json({ message: 'No video file uploaded' });  
      // }

      const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
      console.log(fileUploadResult);


      const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
      });

      res.status(201).json({
        message: "food created success",
        food: foodItem
      });
 };


async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({})
  res.status(200).json({
     message: "Food items fetched successfully",
     food : foodItems
  });
} 


    module.exports = {
        createFood,
        getFoodItems
    };