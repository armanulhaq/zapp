import express from "express";
import {
    isAuth,
    login,
    logout,
    register,
} from "../controllers/UserController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.post("/logout", authUser, logout);

export default userRouter;

// When your app starts or refreshes, it needs to know if the user is still logged in
// So it calls /api/user/is-auth to ask the server "Am I still logged in?"
// Also,
// Login/Register Routes (NO middleware needed):
// These are PUBLIC routes and anyone should be able to access them
// If we put authUser here, it would create a paradox:
// "You need to be logged in to log in"
// Logout Route (NEEDS middleware) as this is a PROTECTED route
// Only logged-in users should be able to logout
