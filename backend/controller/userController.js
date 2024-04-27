import express from 'express';
import User from '../Model/userModel.js';

export const getUsers = async (req, res) => {
    try{
        const userIn = req.user._id;

        const filterUser = await User.find({_id: {$ne: userIn}}).select("-password")

        res.status(200).json(filterUser)
    }catch(error){
        console.log("internal server fetch user error", error.message)
        res.status(500).json({error: "internal server fetch user error"})
    }
}


export const getLoggedUser = async(req, res) => {
    try{
        const loggedUser = req.user._id;

        const getAllUser = await User.find({_id: {$all: loggedUser}}).select("-password")
        //console.log("getLoggedUser :", getAllUser)
        res.status(200).json(getAllUser)
    }catch(error){
        console.log("internal server error in getlogged", error.message)
        res.status(500).json({error: "internal server error get logged"})
    }
}