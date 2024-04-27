import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';



const protectRoute = async (req, res, next) => {
    try{
        //const token = req.cookies.jwt;
        const token = req.headers.authorization;
        //console.log("token in protectRoute :", token)
        if(!token){
            return res.status(401).json({error: "not token found"})
        }
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("decoded user :", decoded)

        if(!decoded){
            res.status(401).json ({ error: "unknown token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            res.status(400).json({error: "user not found"})
        }

        req.user = user;

        next();
    }catch(error){
        console.log("fail in protectRoute", error.message)
        return res.status(500).json({error: "internal protect server error"})
    }
}


export default protectRoute;