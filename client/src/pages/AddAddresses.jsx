import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddAddresses = () => {
    const { axios, user, navigate } = useAppContext();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/address/add", formData);
            if (data.success) {
                toast.success(data.message);
                navigate("/cart", {
                    state: { newAddressId: data.address._id },
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/cart");
        }
    }, [user]);

    return (
        <div className="mt-16 pb-16">
            <p className="text-2xl md:text-3xl text-gray-500">
                Add shipping{" "}
                <span className="font-semibold text-primary">address</span>
            </p>
            <div className="flex flex-col-reverse md:flex-row sm:gap-10 md:gap-20 lg:gap-50 justify-center mt-10">
                <div className="flex-1 max-w-md">
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={onSubmitHandler}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First Name"
                                className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last Name"
                                className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                                required
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email address"
                            className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                            required
                        />
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleInputChange}
                            placeholder="Street"
                            className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                            required
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="City"
                                className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                                required
                            />
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="State"
                                className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleInputChange}
                                placeholder="Zip Code"
                                className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                                required
                            />
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                placeholder="Country"
                                className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                                required
                            />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                            className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full mt-6 bg-primary text-white rounded-lg py-3 hover:bg-primary-dull transition cursor-pointer uppercase"
                        >
                            Save Address
                        </button>
                    </form>
                </div>
                <div>
                    <img
                        src={assets.add_address_iamge}
                        alt="Add Address"
                        className="md:mr-16 mb-16 md:mt-0"
                    />
                </div>
            </div>
        </div>
    );
};

export default AddAddresses;
