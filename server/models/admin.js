import mongoose from "mongoose";

const adminSchema =  new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    telephone:Number,
    avatar:String,
})

const Admin = mongoose.model('admin', adminSchema);
export default Admin