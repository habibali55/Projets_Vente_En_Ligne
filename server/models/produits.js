import mongoose from "mongoose";

const produitsSchema = new mongoose.Schema({
    Name: String,
    Prix: String,
    Description: String,
    avatar: String,
    Status: String,
})

const Produits = mongoose.model('Produits', produitsSchema);
export default Produits