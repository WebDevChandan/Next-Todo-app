import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";

const { assyncError, errorHandler } = require("@/middlewares/error");

const handler = assyncError(async (req, res) => {
    if (req.method !== "POST")
        return errorHandler(res, 400, "Only POST Request is allowed");

    const { email, password } = req.body;

    if (!email || !password)
        return errorHandler(res, 400, "Please enter all fields");

    await connectDB();

    //Find a user with an email that matches the provided email, regardless of whether it's in lowercase or uppercase because of i flag in regular expression.
    let user = await User.findOne({ email: { $regex: new RegExp(email, "i") } }).select("+password");

    if (!user) return errorHandler(res, 400, "Invalid Email or Password");
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return errorHandler(res, 400, "Invalid Email or Password");
    
    const token = generateToken(user._id);

    cookieSetter(res, token, true);

    res.status(200).json({
        success: true,
        message: `Welcome Back, ${user.name}`,
        user,
    });

});

export default handler;