import mongoose from "mongoose";

//Task Schema
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Description Too Short"],
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    }
});

mongoose.models = {};

export const Task = mongoose.model("Task", schema);