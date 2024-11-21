import mongoose from "mongoose";


await mongoose.connect("mongodb://localhost:27017/parLunette")

    .then(() => {
        console.log("Data base connected successfuly.");

    })
    .catch((error) => {
        console.log("Data base connection failed:", error.message);
    })