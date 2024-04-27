import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoute from './Router/authRouter.js';
import connectDB from './Model/db/connectDB.js'
import userRoute from './Router/userRoute.js'
import messageRoute from './Router/messageRouter.js'

import { server, app } from './socket/socket.io.js';




dotenv.config();

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cookieParser());
app.use(cors())


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/message', messageRoute)




server.listen(PORT, () => {
    connectDB()
    console.log(`connected server: ${PORT}`)
})



