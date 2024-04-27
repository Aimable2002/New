import express from 'express';
import User from '../Model/userModel.js';
import generateToken from '../utility/generateToken.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'



export const signup = async (req, res) => {
    
    try{
        const {userName, age, gender, password, confirmPassword} = req.body;
        console.log("signed data sent :", req.body)

    if(!userName || !age || !gender || !password || !confirmPassword){
        
        return res.status(400).json({error: "fill all the field"})

    }
    if(password !== confirmPassword){
        return res.status(400).json({error: "password not match"})
    }
    if(age < 18) {
        return res.status(400).json("no under 18")
    }
    const oldUser = await User.findOne({userName});
     
    if(oldUser){
        return res.status(401).json({error: "username taken"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    

    const avatarBoy = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const avatarGirl = `https://avatar.iran.liara.run/public/girl?username=${userName}`;


    const newUser = new User({
        userName: userName,
        age: age,
        gender: gender,
        password: hashedPassword,
        avatar: gender === "Male" ? avatarBoy : avatarGirl,
    });

    if(newUser){
        generateToken(newUser._id, res)

        await newUser.save();


        res.status(200).json({
            _id: newUser._id,
            userName: newUser.userName,
            avatar: newUser.avatar
        })
    }else{
        console.log("fail to sign user on server :", error.message)
        res.status(401).json({error: "fail to sign user on server"})
    }

    }catch(error){
        console.log("internal server signup error", error.message)
        res.status(500).json({error: "internal server signup error"})
    }

}

export const login = async (req, res) => {
    try{
        const {userName, password} = req.body;
        console.log("sent data :", req.body)
        if(!userName || !password){
            return res.status(401).json({error: "fill all the field"});
        }
        const user = await User.findOne({userName});
        if (!user) {
            return res.status(401).json({ error: "Invalid user data" });
        }
        const isPasswordTrue = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordTrue){
            res.status(401).json({error: "invalid user data"})
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET,
             {expiresIn: '15d'})

        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            avatar: user.avatar,
            token,
        })
    }catch(error){
        console.log("internal server login error", error.message);
        res.status(500).json({error: "internal server login error"})
    }
}


export const logout = (req, res) => {
    try{
        res.cookie("jwt", "",  {maxAge: '0'});
        res.status(200).json("successfully logout")
    }catch(error){
        console.log("internal server logout error", error.message)
        res.status(500).json({error: "internal server logout error"})
    }
}
