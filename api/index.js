import express from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "./models/user.js";
import Chat from "./models/message.js";

const app = express();
const port = 8000;
app.use(cors({
  origin:"*",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://rkathayat1103:xF5NUUIbR7WiodHd@cluster0.u12xvoj.mongodb.net/xmatch"
  )
  .then(() => {
    console.log("Conneted to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB");
    console.log(err);
  });

app.listen(port, () => {
  console.log(`dating-app server running on port ${port}`);
});

//api endpoint to register the user in the backend db

app.post("/register", async (req, res) => {
  try {
    console.log("hello");
    const { name, email, password } = req.body;
    //check if email already exists in db
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
      return res.status(400).json({ message: "user already exists" });
    }
    //create a new user object
    const newUser = new User({
      name,
      email,
      password,
    });
    //generate a verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    //save the user to database
    await newUser.save();
    //send verification email notification to user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(200).json({ message: "registration complete" });
  } catch (err) {
    console.log("registration error: " + err);
    res.status(500).json({ message: "registration failed" });
  }
});

//send verifiacation email function
const sendVerificationEmail = async (email, verificationToken) => {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "rahulkathy1103@gmail.com",
      pass: "qvrfgxshagztmsws",
    },
    secure:false,
  });

  const mailOptions = {
    from: "Xmatch.com",
    to: email,
    subject: "Email verification",
    text: `Click on the link to verify your account : http://localhost:${port}/verify/${verificationToken}`,
  };
  //send the mail
  try {
    await transport.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
  }
};

//verify the user

app.get("/verify/:token", async (req, res) => {
  try{
    const token = req.params.token;
    const user = await User.findOne({verificationToken: token});
    if(!user){
      return res.status(404).json({message:"invalid token"});
    }
    // mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({message:"successfully verified email"});
  }
  catch (e) {
    console.log(e);
    res.status(500).json({message: "email verification failed"});
  }
});

//api endpoint for login 
app.post("/login",async (req,res) => {
  try{
    const {email,password} = req.body;

    //check if user doesnt exist
    const user=User.findOne({email});
    if(!user){
      return res.status(404).json({message:"Invalid Email or Password"});
    }
    if(user.password !== password){
      return res.status(401).json({message:"invalid password"});
    }
    const token = jwt.sign({userId:user._id,secretKey});

  }catch(e){
    console.log("Error while Login");
    console.log(e);
  }
});