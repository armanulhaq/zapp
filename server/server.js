import cookieParser from "cookie-parser"; //Lets you read cookies sent by the client
import express from "express";
import cors from "cors"; //Helps your backend allow requests from a different frontend (e.g., frontend on port 5173)
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";

const app = express();

const port = process.env.PORT || 4000;

await connectDB();

const allowedOrigins = ["http://localhost:5173"];

//Middleware configuration
app.use(express.json()); //It tells your Express app to automatically parse any incoming request that has a Content-Type of application/json.
//express.json(): This is built-in middleware in Express that parses JSON request bodies and makes the data available on req.body.

app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => {
    res.send("HIIIII");
});

app.use(`/api/user`, userRoute);

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
