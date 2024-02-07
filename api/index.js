import express from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import cors from "cors";


const app = express(); 
const port = 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect("mongodb+srv://rkathayat1103:xF5NUUIbR7WiodHd@cluster0.u12xvoj.mongodb.net/xmatch")
.then(()=>{
    console.log("Conneted to MongoDB");
})
.catch((err)=>{
    console.log("Error connecting to MongoDB");
    console.log(err);
});

app.listen(port,()=>{
    console.log(`dating-app server running on port ${port}`);
})