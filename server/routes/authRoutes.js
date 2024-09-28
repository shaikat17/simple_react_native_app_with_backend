import express from "express";
import {
  loginController,
  registerConltroller,
  updateController,
} from "../controllers/authController.js";
import { auth } from "../helpers/jwt.js";
import upload from "../helpers/uploadMiddleware.js";

// Router Object
const authRouter = express.Router();

// Routes
authRouter.post("/register", registerConltroller);

authRouter.post("/login", loginController);

authRouter.post("/update", auth, upload.single('avatar'), updateController);

export default authRouter;
