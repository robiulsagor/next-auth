import mongoose from "mongoose"

export const connect = async () => {
    const mongoUri = process.env.MONGO_URI || "default"
    try {
        await mongoose.connect(mongoUri)
        console.log("Connected!");
    } catch (error) {
        console.log("Could not connect");
    }
}