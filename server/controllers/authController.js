import { hashPass, matchPass } from "../helpers/authHelper.js";
import { User } from "../models/userModel.js";

const registerConltroller = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "password is required",
      });
    }

    //   existing user check
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "The email already registered.",
      });
    }

    //   hash password and save to database
    password = await hashPass(password);

    const savedUser = await User({ name, email, password }).save();

    res.status(201).json({
      success: true,
      message: "Registration is successful.",
      savedUser,
    });
  } catch (error) {
    console.log("🚀 ~ registerConltroller ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Opps! Something bad happened.",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log("🚀 ~ loginController ~ { email, password }:", { email, password })

    // validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "password is required",
      });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not found.",
      });
    }

    // match password

    const isMatch = await matchPass(password, user.password);

    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Opps! Email or Password is incorrect.",
      });
    }

    //   undefined password
      user.password = undefined
    return res.status(200).json({
      success: false,
      message: "Login is SuccessFull",
      user,
    });
  } catch (error) {
    console.log("🚀 ~ loginController ~ error:", error);
    return res.status(500).json({
      success: false,
      message: "Opps! Something bad happened.",
      error,
    });
  }
};

export { registerConltroller, loginController };
