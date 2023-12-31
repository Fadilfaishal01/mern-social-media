import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

// Register User
export const register = async (req, res) => {
   try {
      const {
         firstName, 
         lastName, 
         email, 
         password, 
         picturePath, 
         friends, 
         location, 
         occupation
      } = req.body;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({
         firstName, 
         lastName, 
         email, 
         password: passwordHash, 
         picturePath, 
         friends, 
         location, 
         occupation,
         viewedProfile: Math.floor(Math.random() * 10000),
         impressions: Math.floor(Math.random() * 10000),
      });
      const saveUser = await newUser.save();
      res.status(201).json(saveUser);
   } catch (err) {
      console.log("Error : register");
      res.status(500).json({error: err.message});
   }
};

// login User
export const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const dataUser = await User.findOne({email: email});
      if (!dataUser) return res.status(400).json({msg: "User does not exist."});

      const isMatch = await bcrypt.compare(password, dataUser.password);
      if (!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

      const token = jwt.sign({id: dataUser._id}, process.env.JWT_SECRET);
      delete dataUser.password;
      res.status(200).json({token, dataUser});
   } catch (err) {
      console.log("Error : login");
      res.status(500).json({error: err.message});
   }
}