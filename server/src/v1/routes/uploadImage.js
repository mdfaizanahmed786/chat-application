const express=require('express');
const authenticateUser = require('../middleware');
const uploadImage = require('../controllers/firebase/uploadImage');
const router=express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

router.post('/uploadImage',authenticateUser, upload ,uploadImage);


module.exports=router;