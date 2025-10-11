import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute=async (req,res,next)=>{
    try{
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"Unauthorized - No Token Provided"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid Token"});
        }

        const user = await User.findById(decoded.UserId).select("-password");

        if(!user){
            return res.status(404).json({message:"No User Found"});
        }

        req.user = user
        next()

    }catch(err){
        console.error("Error in protectRoute middleware:",err);
        res.status(500).json({message:"Internal Server error"});
    }
}