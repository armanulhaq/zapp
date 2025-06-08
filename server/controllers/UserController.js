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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // comes from user form
        if (!email || !password) {
            return res.json({
                success: false,
                message: "Please fill all the details.",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({
            success: true,
            user: { email: user.email, name: user.name },
            message: "User successfully created",
        }); //Creates secure cookie with token and sends back success message
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//Check Auth: /api/user/is-auth
export const isAuth = async (req, res) => {
    //authUser middleware extracts the userId from cookie and sends back info to this
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        return res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//logout user /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.json({ success: true, message: "Successfully logged out!" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
