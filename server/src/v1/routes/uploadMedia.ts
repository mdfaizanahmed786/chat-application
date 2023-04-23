import express from 'express';
import authenticateUser from '../middleware.js';
const router=express.Router();
import multer from 'multer';
import uploadMedia from '../controllers/firebase/uploadMedia.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

router.post('/uploadMedia', authenticateUser, upload ,uploadMedia);


export default router;
