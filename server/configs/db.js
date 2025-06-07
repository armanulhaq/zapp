import mongoose from "mongoose";
//Helper tool that gives structure, validation, and useful features for working with MongoDB in Node.js.

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database Connected!"); //When the connection to the database is successful, let me know by printing a message.
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/zapp`); //connect using the URL and connect specifically to zapp database
    } catch (error) {
        console.log(error.message);
    }
};

export default connectDB;
