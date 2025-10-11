import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";

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

export const login = (req,res)=>{
    const {fullName,email,password} = req.body;

    try{

    }catch(err){
        
    }
}

export const logout = (req,res)=>{
    res.send("logout route")
}