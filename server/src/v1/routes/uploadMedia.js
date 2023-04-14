const express=require('express');
const authenticateUser = require('../middleware');
const router=express.Router();
const multer = require('multer');
const uploadMedia = require('../controllers/firebase/uploadMedia');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

router.post('/uploadMedia',authenticateUser, upload ,uploadMedia);


module.exports=router;