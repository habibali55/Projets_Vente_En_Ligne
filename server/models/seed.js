import User from "./user.js";
import {
    paiementContent,
    clientContent,
    adminContent,
    userContent,
    produitsContent
} from "../data.js";
import mongoose from "mongoose";
import Client from "./clients.js";
import Admin from "./admin.js";
import Paiement from "./paiementenligne.js";
import Produits from "./produits.js";
import bcrypt from "bcrypt";

await mongoose.connect("mongodb://localhost:27017/parLunette"
).then(() => { console.log("Data base connected successfuly."); }).catch((error) => { console.log("Data base connection failed:", error.message); })

const user = async () => {
    try {
        // Hacher les mots de passe
        const hashedUsers = await Promise.all(userContent.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return { ...user, password: hashedPassword };
        }));

        // Insérer les utilisateurs avec les mots de passe hachés
        await User.insertMany(hashedUsers);

        console.log("Users seeded successfully");
    } catch (error) {
        console.log(error);
    }
};

user();

const client = async () => {
    try {
        await Client.insertMany(clientContent),
            console.log("client seeded")
    } catch (error) {
        console.log(error)
    }
}
client();

const admin = async () => {
    try {
        await Admin.insertMany(adminContent),
            console.log("admin seeded")
    } catch (error) {
        console.log(error)
    }
}
admin();

const paiement = async () => {
    try {
        await Paiement.insertMany(paiementContent),
            console.log("paiement seeded")
    } catch (error) {
        console.log(error)
    }
}
paiement();
const produits = async () => {
    try {
        await Produits.insertMany(produitsContent),
            console.log("produits seeded")
    } catch (error) {
        console.log(error)
    }
}
produits();





