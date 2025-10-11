import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        const uri = process.env.MONGODB_URL;
        if(!uri) throw new Error("MONGO_URL is not defined");
        
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(err){
        console.error("MongoDB connection error:", err)
    }
};