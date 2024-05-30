import mongoose from "mongoose";


async function connectDB(){
    try {
        await mongoose.connect("mongodb://localhost:27017/production");
        console.log("Connected to database successfully");
    } catch (error) {
        console.log("Error in Connecting to Mongo DB: ", error);
        process.exit(1)
    }
}

export default connectDB;