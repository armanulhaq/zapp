import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register User : api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message: "Please fill all the details.",
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists.",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        }); //creates a secure token that contains the user's ID signed using your secret key

        res.cookie("token", token, {
            httpOnly: true, //not accessible via JavaScript (for security).
            secure: process.env.NODE_ENV === "production", //when true cookie will be sent only over https
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //Only sends the cookie if the request is from the same site if strict. none Allows cross-site cookies
            maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time
        });
        //This token is used to authenticate the user later without asking them to log in again.
        return res.json({
            success: true,
            user: { email: user.email, name: user.name },
            message: "User successfully created",
        });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export default register;
