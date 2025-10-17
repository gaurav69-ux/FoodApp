const fooModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4:uuid } = require('uuid');
const multer = require('multer');



async function createFood(req, res) {

      console.log(req.foodPartner);

      console.log(req.body);

      console.log(req.file);// multer se file mil rhi h

      if (!req.file) {
          return res.status(400).json({ message: 'No video file uploaded' });  // if file is not upload then show this error
      }

      const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid());

      console.log(fileUploadResult);

      res.send("food item created successfully");

 };


    module.exports = {
        createFood
    };