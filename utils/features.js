import mongoose from "mongoose"
import { serialize } from 'cookie'
import jwt from "jsonwebtoken";
import { User } from "@/models/user";

export const connectDB = async () => {
    const { connection } = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "NextTodo",
    });
    console.log(`Database Connected on ${connection.host}`);
};

export const cookieSetter = (res, token, set) => {
    res.setHeader("Set-Cookie", serialize("token", set ? token : "", {
        path: "/",
        httpOnly: true,
        maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0, //15 Days
    }))
}


export const generateToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET);
}

export const checkAuth = async (req) => {
    const cookie = req.headers.cookie;
    
    if (!cookie) return null;

    // req.headers.cookie.split("=")[1]: This will return the token value, that'll be stored in browser cookie of a particular authenticated user (Logged In User);
    const token = cookie.split("=")[1];

    //decoded: Object of _id(Mongodb generated ObjectId) & iat
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return await User.findById(decoded._id);
} 