import express from "express"
import { registerConltroller } from "../controllers/authController.js"

// Router Object
const authRouter = express.Router()

// Routes
authRouter.post('/register', registerConltroller)


export default authRouter