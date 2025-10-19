import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
export const signup =async  (req,res)=>{
    const {fullName,email,password}=req.body;
    

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All Fields Are Required"});
        }
        if(password.length<6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const user = await User.findOne({email})

        if(user) return res.status(400).json({message: "Email already exist"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })

        if(newUser){
            //generate JWT token
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic:newUser.profilePic,
            });

        }else{
            res.status(400).json({message:"Invalid user Data"});
        }


    }catch(err){
        console.log("Error in signUp controller", err.message)
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        if( !email || !password){
            return res.status(400).json({message:"All Fields are required"});
        }
        const existingUser = await User.findOne({email}).select("+password");
        if(!existingUser){
            return res.status(400).json({message:"No User Found, Try Signing Up"});
        }
        const isMatch = await bcrypt.compare(password,existingUser.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid Password"});
        }

        generateToken(existingUser._id,res);

        res.status(200).json({
            _id:existingUser._id,
            fullName:existingUser.fullName,
            email:existingUser.email,
            profilePic:existingUser.profilePic,
            message:"Login Successful",
        });
    }catch(err){
        console.error("Error in logging controller:",err);
        res.status(500).json({message:"Error in Logging in"});
    }
}

export const logout = (req,res)=>{
    try{
        res.cookie("jwt","",{
            expires:new Date(0),
            sameSite:"strict",
        })
        res.status(200).json({message:"Logged out Successfully"});
    }catch(err){
        console.error("Error in Loggin out:",err);
        res.status(400).json({message:"Internal Server"});
    }
}


export const updateProfile=async (req,res)=>{
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }


       const uploadResponse = await cloudinary.uploader.upload(profilePic);

       const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new: true})

       res.status(200).json(updatedUser);

    }catch(err){    
        console.error("Error in update Profile:", err);
        res.status(500).json({message:"Internal Server Error"});
    }
}


export const checkAuth = async (req,res)=>{
    try{
        res.status(200).json(res.user);
    }catch(err){
        console.log("Error in checkAuth controller", err);
        res.status(500).json({message:"Internal Server Error"});
    }
}