import multer, { diskStorage } from 'multer';
import express from 'express';
import protectRoute from '../middle/protectRoute.js';


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'frontend/public/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage})


router.post('/uploadProfile', protectRoute, upload.single("file"), (req, res) => {
    try{
        console.log("file :", req.file)
        console.log("upload completed")
        res.status(200).json("upload completed")
    }catch(error){
        console.log("fail to upload on server :", error.message);
        res.status(500).json({error: "internal server upload error"})
    }
})


export default router;