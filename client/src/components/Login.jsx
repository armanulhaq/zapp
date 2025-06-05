import { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setShowUserLogin, setUser } = useAppContext();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setUser({ email: "test@greatstack@dev", name: "Arman" });
        setShowUserLogin(false);
    };

    return (
        <div
            onClick={() => {
                setShowUserLogin(false);
            }} //if clicked anywhere in the div, user login form is gone
            className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
        >
            <form
                onSubmit={onSubmitHandler}
                onClick={(e) => {
                    e.stopPropagation();
                }} //when we click inside login form it should not propagate to parent and and close the login
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
            >
                <p className="text-2xl font-bold m-auto">
                    {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary-dull"
                            type="text"
                            required
                        />
                    </div>
                )}
                <div className="w-full ">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary-dull"
                        type="email"
                        required
                    />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary-dull"
                        type="password"
                        required
                    />
                </div>
                {state === "register" ? (
                    <p>
                        Already have account?{" "}
                        <span
                            onClick={() => setState("login")}
                            className="text-primary cursor-pointer"
                        >
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create an account?{" "}
                        <span
                            onClick={() => setState("register")}
                            className="text-primary cursor-pointer"
                        >
                            Click here
                        </span>
                    </p>
                )}
                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
