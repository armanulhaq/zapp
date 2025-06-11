import jwt from "jsonwebtoken";

export const sellerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (
            password === process.env.SELLER_PASSWORD &&
            email === process.env.SELLER_EMAIL
        ) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });

            res.cookie("sellerToken", token, {
                httpOnly: true, //not accessible via JavaScript (for security).
                secure: process.env.NODE_ENV === "production", //when true (production) cookie will be sent only over https
                sameSite:
                    process.env.NODE_ENV === "production" ? "none" : "strict", //Only sends the cookie if the request is from the same site if strict. none Allows cross-site cookies
                maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time
            });
            return res.json({ success: true, message: "Seller logged in!" });
        } else {
            return res.json({
                success: false,
                message: "Invalid credentials!",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
//Seller is authenticated: api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    //no need to check if user is in db, as there is only one seller and he passed the criteria
    try {
        return res.json({ success: true });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

//logout user /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
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
