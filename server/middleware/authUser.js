// middleware/authUser.js
import jwt from "jsonwebtoken";

// Middleware to verify user authentication
const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "Not authorized" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.userId = tokenDecode.id; // ✅ Standard and safe
            next(); // Proceed to the next middleware or controller
        } else {
            res.json({ success: false, message: "Not authorized" });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
