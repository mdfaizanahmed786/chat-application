const { initializeApp } = require("firebase/app");
const { ref, getStorage } = require("firebase/storage");
const { getDownloadURL } = require("firebase/storage");
const { uploadBytes } = require("firebase/storage");
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    console.log(file.size)
    if(file.size > 1000000){
        return res.status(400).json({success:false,message: "File size is too large"})
    }
    const storageRef = ref(storage, `images/${file.originalname}`+Date.now());
    const metaData = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytes(storageRef, file.buffer, metaData);
    const downloadURL = await getDownloadURL(snapshot.ref);
    res
      .status(200)
      .json({ success: true, downloadURL, name: file.originalname });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = uploadImage;
