import express from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import cors from "cors";
import User from "./models/user.js";
import Chat from "./models/message.js";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const port = 8000;
const port2 = 3000;
const server = createServer(app);
const io = new Server(server);
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();
const connectedUsers = {};
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
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
    secure: false,
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
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "invalid token" });
    }
    // mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "successfully verified email" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "email verification failed" });
  }
});

//api endpoint for login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user doesnt exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    return res.status(200).json({ token });
  } catch (e) {
    console.log("Error while Login");
    console.log(e);
  }
});

//api endpoint to update gender
app.put("/users/:userId/gender", async (req, res) => {
  try {
    const { userId } = req.params;
    const { gender } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { gender: gender },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Gender updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Error while updating gender" });
    console.log(e, "Gender not updated");
  }
});

//api endpoint to update the user description
app.put("/users/:userId/description", async (req, res) => {
  try {
    const { userId } = req.params;
    const { description } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { description: description },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Description updated successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Error while updating description" });
  }
});

//api endpoint to fetch user's data
app.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (e) {
    console.log(e, "error fetching user's data");
    return res
      .status(500)
      .json({ message: "Error while fetching user's data" });
  }
});

//end point to add a turnon for a user in the backend
app.put("/users/:userId/turn-ons/add", async (req, res) => {
  try {
    const { userId } = req.params;
    const { turnOn } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { turnOns: turnOn } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Turn on updated succesfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error adding the turn ons" });
  }
});

//endpoint to remove a particular turn on for the user
app.put("/users/:userId/turn-ons/remove", async (req, res) => {
  try {
    const { userId } = req.params;

    const { turnOn } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { turnOns: turnOn } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Turn on removed succesfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error removing turn on" });
  }
});

//api endpoint to add a looking for for user
app.put("/users/:userId/looking-for", async (req, res) => {
  try {
    const { userId } = req.params;

    const { lookingFor } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { lookingFor: lookingFor } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Looking for update succesfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error updating looking for" });
  }
});

//endpoint to remove a particular turn on for the user
app.put("/users/:userId/looking-for/remove", async (req, res) => {
  try {
    const { userId } = req.params;

    const { lookingFor } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { lookingFor: lookingFor } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "looking for removed succesfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error removing looking for" });
  }
});

//api endpoint to add profile images of user in the database
app.post("/users/:userId/profile-images", async (req, res) => {
  try {
    const { userId } = req.params;
    const { imageUrl } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImages.push(imageUrl);

    await user.save();

    return res.status(200).json({ message: "Image has been added", user });
  } catch (error) {
    res.status(500).json({ message: "Error addding the profile images" });
  }
});

//api endpoint to fetch all the matching profiles for a partifcular user
app.get("/profiles", async (req, res) => {
  try {
    const { userId, gender, turnOns, lookingFor } = req.query;

    let filter = { gender: gender === "male" ? "female" : "male" };
    if (turnOns) {
      filter.turnOns = { $in: turnOns };
    }
    if (lookingFor) {
      filter.lookingFor = { $in: lookingFor };
    }

    const currentUser = await User.findById(userId)
      .populate("matches", "_id")
      .populate("crushes", "_id");
    //extract the ids of the matches
    const friendIds = currentUser.matches.map((friend) =>
      friend._id.toString()
    );
    const crushIds = currentUser.crushes.map((crush) => crush._id.toString());
    const profiles = await User.find(filter)
      .where("_id")
      .nin([userId, ...friendIds, ...crushIds]);
    return res.status(200).json({ profiles });
  } catch (error) {
    console.log(error, "error fetching matching profiles for the user");
    res.status(500).json({
      message: "error fetching matching profiles for the user",
      error,
    });
  }
});

//api endpoint to send a friend/crush request to the other user
app.post("/send-like", async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;
    // update the receipients receivedlikes array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { receivedLikes: currentUserId },
    });
    await User.findByIdAndUpdate(currentUserId, {
      $push: { crushes: selectedUserId },
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error, "error sending the like to the user");
    res.status(500).json({ message: "error sending the like request", error });
  }
});

//ednpoint to get the details of the received Likes
app.get("/received-likes/:userId/details", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch details of users who liked the current user
    const receivedLikesDetails = [];
    for (const likedUserId of user.receivedLikes) {
      const likedUser = await User.findById(likedUserId);
      if (likedUser) {
        receivedLikesDetails.push(likedUser);
      }
    }

    res.status(200).json({ receivedLikesDetails });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching received likes details",
      error: error.message,
    });
  }
});

//endpoint to create a match betweeen two people
app.post("/create-match", async (req, res) => {
  try {
    const { currentUserId, selectedUserId } = req.body;

    //update the selected user's crushes array and the matches array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { matches: currentUserId },
      $pull: { crushes: currentUserId },
    });

    //update the current user's matches array recievedlikes array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { matches: selectedUserId },
      $pull: { receivedLikes: selectedUserId },
    });

    res.status(200).json({ message: "successfully created match" });
  } catch (error) {
    res.status(500).json({ message: "Error creating a match", error });
  }
});

//endpoint to get all the matches of the particular user
app.get("/users/:userId/matches", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchIds = user.matches;

    const matches = await User.find({ _id: { $in: matchIds } });

    res.status(200).json({ matches });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the matches", error });
  }
});

//socket endpoints
io.on("connection", (socket) => {
  console.log(`a user connected with socket id : ${socket.id}`);

  socket.on('setUserID', (userID) => {
    connectedUsers[userID] = socket.id;
    console.log(`UserId : ${userID} connected`);
  });

  socket.on("sendMessage", async (data) => {
    try {
      console.log("data of message", data);
      const { senderId, receiverId, message } = data;

      //save the messages in the database
      const newMessage = new Chat({ senderId, receiverId, message });
      await newMessage.save();

      // emit the message to the receiver
      const receipientSocketId = connectedUsers[receiverId];

      if(receipientSocketId){
        io.to(receipientSocketId).emit("receiveMessage", newMessage);
      }
      else{
        console.log(`UserId : ${receiverId} is not connected`);
      }
    } catch (error) {
      console.log("error sending message", error);
    }
  });

  socket.on("disconnect", () => {
      console.log(`user  ${socket.id} disconnected`);
      const userID = Object.keys(connectedUsers).find(
        key => connectedUsers[key] === socket.id
      );
      if (userID) {
        delete connectedUsers[userID];
        console.log(`UserId : ${userID} disconnected`);
      }
  });
});

server.listen(port2, () => {
  console.log(`socket server listening on ${port2}`);
});

//endpoint to fetch the chat messages of the user
app.get("/messages", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;
    console.log("senderId: " , senderId , "receiverId: " , receiverId);

    const messages = await Chat.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    console.log("error fetching the messages", error);
  }
});
