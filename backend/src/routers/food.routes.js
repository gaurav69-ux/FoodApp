const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const router = express.Router();
const multer = require('multer');
// const uploa = multer({ dest: 'uploads/' })


const upload = multer({
    storage: multer.memoryStorage()
})

// POST /api/food/   [protected]
router.post('/',
    authMiddleware.authFoodPartnerMiddleware,
    upload.single('mama'),
    foodController.createFood);



module.exports = router;