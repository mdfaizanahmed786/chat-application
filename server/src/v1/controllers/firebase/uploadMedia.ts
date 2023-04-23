import { initializeApp } from "firebase/app";
import { ref, getStorage } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { Request, Response } from "express";

const uploadMedia = async (req:Request, res:Response) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY as string,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.FIREBASE_APP_ID as string
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const storage = getStorage(firebaseApp);
  try {
    const file = req.file;
   
    if(file!.size > 3000000){
        return res.status(400).json({success:false,message: "File size is too large"})
    }
    const storageRef = ref(storage, `media/${file?.originalname}`+Date.now());
    const metaData = {
      contentType: file?.mimetype,
    };
    const snapshot = await uploadBytes(storageRef, file!.buffer, metaData);
    const downloadURL = await getDownloadURL(snapshot.ref);
    if (!downloadURL) {
      return res
        .status(400)
        .json({ success: false, message: "File upload failed" });
    }
    res
      .status(201).json({success:true, downloadURL })
  } catch (err:any) {
    res.status(500).json({ message: err.message, success: false });
  }
};

export default uploadMedia;
