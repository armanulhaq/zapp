import Address from "../models/address.js";

//Add address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipcode,
            country,
            phone,
        } = req.body;

        const userId = req.userId;

        const address = await Address.create({
            firstName,
            lastName,
            email,
            street,
            city,
            state,
            zipcode,
            country,
            phone,
            userId,
        });

        res.json({
            success: true,
            message: "Address added successfully!",
            address,
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ success: false, message: error.message });
    }
};
