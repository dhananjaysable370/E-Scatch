import mongoose from "mongoose";

export const dbConnection = async (url, cb) => {
    try {
        await mongoose.connect(url);
        console.log("DB Connected!");
        cb();
    } catch (error) {
        console.error("Error while connecting to db:", error);
    }
};

export default dbConnection;
