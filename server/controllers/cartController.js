import User from "../models/user.js";

//Update user CartData: api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        await User.findByIdAndUpdate(userId, { cartItems }); //update cart items of corresponding user
        res.json({ success: true, message: "Cart updated!" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
