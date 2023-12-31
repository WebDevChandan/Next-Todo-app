import mongoose from "mongoose";

//User Schema
const schema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        unique: true,
        required: true,
    },
    password: {
        type:String,
        required: true,
        select: false,
        minLength: [6, "Password Too Short"],
    },
});

mongoose.models = {};

export const User = mongoose.model("User", schema);