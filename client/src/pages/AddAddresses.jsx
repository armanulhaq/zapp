import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddAddresses = () => {
    const { axios, user, navigate } = useAppContext();
    const [address, setAddress] = useState({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };
    const InputField = ({ type, placeholder, name, handleChange, address }) => {
        return (
            <input
                className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                name={name}
                value={address[name]}
                required
            />
        );
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/address/add", address);
            if (data.success) {
                toast.success(data.message);
                navigate("/cart");
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
    }, []);
    return (
        <div className="mt-16 pb-16">
            <p className="text-2xl md:text-3xl text-gray-500">
                Add shipping{" "}
                <span className="font-semibold text-primary">address</span>
            </p>
            <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
                <div className="flex-1 max-w-md">
                    <form onSubmit={onSubmitHandler}>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                type="text"
                                handleChange={handleChange}
                                address={address}
                                name="firstName"
                                placeholder="First Name"
                            />
                            <InputField
                                type="text"
                                handleChange={handleChange}
                                address={address}
                                name="lastName"
                                placeholder="Last Name"
                            />
                        </div>
                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name="email"
                            type="email"
                            placeholder="Email address"
                        />
                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name="street"
                            type="text"
                            placeholder="Street"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name="city"
                                type="text"
                                placeholder="City"
                            />
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name="state"
                                type="text"
                                placeholder="State"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name="zipcode"
                                type="number"
                                placeholder="Zip Code"
                            />
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name="country"
                                type="text"
                                placeholder="Country"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name="city"
                                type="text"
                                placeholder="City"
                            />
                            <InputField
                                handleChange={handleChange}
                                address={address}
                                name="phone"
                                type="number"
                                placeholder="Phone"
                            />
                        </div>
                        <button className="w-full mt-6 bg-primary rounded-lg py-3 hover:bg-primary-dull transition cursor-pointer uppercase ">
                            Save Address
                        </button>
                    </form>
                </div>
                <img
                    src={assets.add_address_iamge}
                    alt="Add Address"
                    className="md:mr-16 mb-16 md:mt-0"
                />
            </div>
        </div>
    );
};

export default AddAddresses;
