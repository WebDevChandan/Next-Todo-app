import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
import bcrypt from "bcrypt";

const { assyncError, errorHandler } = require("@/middlewares/error");

const handler = assyncError(async (req, res) => {
    if (req.method !== "POST")
        return errorHandler(res, 400, "Only POST Request is allowed");

    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return errorHandler(res, 400, "Please enter all fields");

    await connectDB();

    //Find a user with an email that matches the provided email, regardless of whether it's in lowercase or uppercase.
    let user = await User.findOne({ email: {$regex: new RegExp(email, "i")}});

    if (user) return errorHandler(res, 400, "User already registered with this email");

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user._id);

    cookieSetter(res, token, true);

    res.status(201).json({
        success: true,
        message: "Registered Successfully",
        user,
    });

});

export default handler;