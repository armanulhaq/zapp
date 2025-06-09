import { assets, features } from "../assets/assets";

const BottomBanner = () => {
    return (
        <div className="relative my-24">
            <img
                src={assets.bottom_banner_image}
                alt="banner"
                className="w-full h-[500px] object-cover hidden md:block rounded-xl"
            />
            <img
                src={assets.bottom_banner_image_sm}
                alt="banner"
                className="w-full  object-cover md:hidden rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col items-center md:items-start md:justify-center pt-4 md:pt-0 md:pl-16">
                <div>
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6  lg:text-black">
                        Why we are the best?
                    </h1>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 mt-2 text-white  lg:text-black"
                        >
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                className="md:w-11 w-9"
                            />
                            <div className="">
                                <h3 className="text-lg md:text-xl font-semibold ">
                                    {feature.title}
                                </h3>
                                <p className="text-white lg:text-black text-xs md:text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BottomBanner;
