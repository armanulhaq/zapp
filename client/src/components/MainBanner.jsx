import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const MainBanner = () => {
    return (
        <div className="relative">
            <img
                src={assets.main_banner_bg}
                alt="main banner "
                className="w-full h-[500px] hidden md:block rounded-xl object-cover"
            />
            <img
                src={assets.main_banner_bg_sm}
                alt="main banner"
                className="w-full md:hidden rounded-xl"
            />
            <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
                <h1 className="text-3xl md:4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
                    Freshness you can trust, Savings you will love!
                </h1>

                <div className="flex items-center mt-6 font-medium gap-6">
                    {" "}
                    {/*Group is used to group the elements inside the parent element, after that by group-focus, any focus on parent triggers action on child */}
                    <Link
                        to="/products"
                        className="group flex items-center gap-2 px-7 md:px-9 py-3 rounded-lg bg-white hover:bg:primary-dull transition  cursor-pointer"
                    >
                        Zapp Now
                        <img
                            className="md:hidden transition group-focus:translate-x-1"
                            src={assets.white_arrow_icon}
                            alt="right arrow"
                        />
                    </Link>
                    <Link
                        to="/products"
                        className="group hidden md:flex items-center gap-2 px-5 md:px-7 py-3 cursor-pointer border-1  border-white rounded-lg"
                    >
                        Explore Deals
                        <img
                            className="transition group-hover:translate-x-1"
                            src={assets.white_arrow_icon}
                            alt="right arrow"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MainBanner;
