require('dotenv').config()
const express = require('express')
const { createImage } = require("../controllers/images")

const cloudinary = require('../utils/cloudinaryConfig');
const multer = require('../utils/multer');
const router=express.Router()
const path = require('path');

router.post('/:idHab',multer.single('image'),createImage)

module.exports = router