import mongoose from "mongoose";

const clientsSchema =  new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    telephone:Number,
    avatar:String,
    Status:String,
})

const Clients = mongoose.model('clients', clientsSchema);
export default Clients