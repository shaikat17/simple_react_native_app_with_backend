import express from "express"
import { loginController, registerConltroller } from "../controllers/authController.js"

// Router Object
const authRouter = express.Router()

// Routes
authRouter.post('/register', registerConltroller)

authRouter.post('/login', loginController)


export default authRouter