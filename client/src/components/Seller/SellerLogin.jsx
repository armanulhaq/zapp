import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios } = useAppContext();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post("/api/seller/login", {
                email,
                password,
            });
            if (data.success) {
                setIsSeller(true);
                navigate("/seller");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    useEffect(() => {
        if (isSeller) {
            navigate("/seller");
        }
    }, [isSeller]);

    return (
        !isSeller && (
            <form
                onSubmit={onSubmitHandler}
                className="min-h-screen flex items-center text-sm text-gray-600"
            >
                <div className="flex flex-col gap-4 m-auto items-center p-8 py-12 w-80 sm:w-[352px] rounded-lg  border border-gray-200 bg-white">
                    <p className="text-2xl">
                        <span className="text-primary">Seller</span> Login
                    </p>
                    <div className="w-full">
                        <p>Email</p>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                            type="email"
                            placeholder="Email: admin@gmail.com"
                            className="border border-gray-200 rounded-lg w-full p-2 mt-1 outline-primary"
                            required
                        />
                    </div>
                    <div className="w-full">
                        <p>Password</p>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            type="password"
                            placeholder="Password: armanulhaq"
                            className="border border-gray-200 rounded-lg w-full p-2 mt-1 outline-primary"
                            required
                        />
                    </div>
                    <button className="bg-primary w-full py-2 rounded-lg cursor-pointer">
                        Login
                    </button>
                </div>
            </form>
        )
    );
};

export default SellerLogin;
