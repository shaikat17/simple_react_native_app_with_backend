import express from "express"
import { loginController, registerConltroller, updateController } from "../controllers/authController.js"

// Router Object
const authRouter = express.Router()

// Routes
authRouter.post('/register', registerConltroller)

authRouter.post('/login', loginController)

authRouter.post('/update', updateController)


export default authRouter