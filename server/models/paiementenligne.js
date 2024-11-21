import mongoose from "mongoose";

const paiementSchema =  new mongoose.Schema({
    name:String,
    email:String,
    codedeCarte:Number,
    montant:String,
    modePaiement: String,
})

const Paiement = mongoose.model('paiement', paiementSchema);
export default Paiement