import express from "express";
import authUser from "../middleware/authUser.js";
import { addAddress, getAddress } from "../controllers/addressController.js";

const addressRouter = express.Router();

addressRouter.post("/address", authUser, addAddress);
addressRouter.post("/get-address", authUser, getAddress);

export default addressRouter;
