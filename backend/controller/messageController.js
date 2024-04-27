//import express from 'express';
import Conversation from '../Model/conversationModel.js';
import Message from '../Model/messageModel.js';
import { getReceiverSocketId, io } from '../socket/socket.io.js';


export const sendMessage = async (req, res) => {
    try{
        const senderId = req.user._id;
        
        const {id: recieverId } = req.params;
        //console.log('recievedId :', recieverId)
        const { message } = req.body;
        //console.log('message :', message)

        let conversation = await Conversation.findOne({participants: {$all: [senderId, recieverId]}})
        console.log("exist conversation :", conversation);

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, recieverId],
                messages: [],
            })
            console.log("created conversation :", conversation)
        }
        
        const newMessage = new Message({
            senderId,
            recieverId,
            message, 
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const recieverSocketId = getReceiverSocketId(recieverId)
        console.log("recievedSocketId :", recieverSocketId);

        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", newMessage)
            console.log("newMessage :", newMessage)
        }

        res.status(200).json(newMessage)

        

    }catch(error){
        console.log("internal server send message error", error.message)
        res.status(500).json({error: "internal server send message error"})
    }
    
}



export const getMessages = async (req, res) => {
    try{
        const senderId = req.user._id;
        //console.log('senderId :', senderId)
        const {id: userToChat } = req.params;
        //console.log('userToChat :', userToChat)

        const conversation = await Conversation.findOne({participants: {$all: [
             senderId, userToChat]
            }}).populate("messages")
        
        if(!conversation) {
            return res.status(400).json([])
        } 

        const messages = conversation.messages

        res.status(200).json(messages)
        //console.log("get message :", messages)

    }catch(error){
        console.log("internal server get message error :", error.message)
        res.status(500).json({error: "internal server get message error"})
    }
}