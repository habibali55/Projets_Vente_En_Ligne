import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telephone: Number,
    avatar: String,
})

const User = mongoose.model('users', userSchema);
export default User