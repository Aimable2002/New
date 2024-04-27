import express from 'express';
import protectRoute from '../middle/protectRoute.js'
import { getLoggedUser, getUsers } from '../controller/userController.js';

const router = express.Router();


router.get("/getUser", protectRoute, getUsers)
router.get("/getLoggedOne", protectRoute, getLoggedUser)


export default router