import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";



export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashPassword });

    //here we can use token function but it is used in utils so that it can be used again and again
    sendCookie(user, res, "Registerd Succesfully", 201);
  
} catch (error) {
    next(error);
}
};


export const login = async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password"); //here we use select because in models /user we have set password  select:false ,so we have to use it manually

    if (!user) {
      return next(new ErrorHandler("Invalid Email or Password", 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid password", 400));

      //Above line can be written as below if middleware is not used---
      /** return res.status(404).json({
          success: false,
          message: "Wrong Password",
        });**/
    }
    sendCookie(user, res, `Welcome Back ${user.name}`, 200);
} catch (error) {
  next(error);
}
}


export const getMyProfile =(req, res) => {
  res.status(200).json({
    success: true,
    user:req.user,  //through authentication in middleware
  });

};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user, //through authentication in middleware
    });
  
}

