import Address from "../models/address.js";

//Add address: /api/address/add
export const addAddress = async () => {
    try {
        const { address, userId } = req.body;
        await Address.create({ ...address, userId }); //links and adds the address to the corresponding user with their userId
        res.json({ success: true, message: "Address added successfully!" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body;
        const addresses = await Address.find({ userId });
        res.json({ success: true, addresses });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
