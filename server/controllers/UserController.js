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
        const existingUser = await User.findOne({ email }); //MongoDB queries need an object with field names

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
            cartItems: {},
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.cookie("token", token, {
            httpOnly: true, //Prevents JavaScript from accessing the cookie (security)
            secure: process.env.NODE_ENV === "production", //Cookie only sent over HTTPS in production
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //when none,Cookie can be sent when your frontend and backend are on different domains,when production, strict,Cookie only works when frontend and backend are on the same domain
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/", //Cookie is available across all paths on the domain
        });

        return res.json({
            success: true,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                cartItems: user.cartItems,
            },
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
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                cartItems: user.cartItems,
            },
            message: "User successfully logged in",
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
        const user = await User.findById(req.userId).select("-password"); //req.userId is prepared by authUser middleware after authenticating user
        if (!user) {
            return res.json({
                success: false,
                message: "To access this feature please login",
            });
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
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //We need to match exactly how the cookie was set to successfully delete it
        });
        return res.json({ success: true, message: "Successfully logged out!" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
