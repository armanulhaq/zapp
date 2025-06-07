import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        cartItems: { type: Object, required: true, default: {} },
    },
    { minimize: false } //By default Mongoose removes/minimizes empty objects. This prevents that
);

const User = mongoose.models.users || mongoose.model("user", userSchema); //use user model if not available make one

export default User;
