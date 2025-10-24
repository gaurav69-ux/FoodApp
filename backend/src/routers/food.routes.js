const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();
const multer = require('multer');


const upload = multer({
    storage: multer.memoryStorage()
})

// POST /api/food/   [protected]  (yaha data upload krna h)
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('mama'),
    foodController.createFood);

// GET  /api/food/ [protected]       (yaha data get krna h)
router.get('/',
    authMiddleware.authUserMiddleware,
    foodController.getFoodItems); 



module.exports = router;