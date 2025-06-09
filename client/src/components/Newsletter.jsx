const Newsletter = () => {
    return (
        <div className="flex flex-col items-center w-full max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-30 bg-primary-faded text-white">
            <div className="flex flex-col justify-center items-center text-center">
                <h1 className="text-2xl lg:text-4xl md:text-[40px] text-black font-bold">
                    Get the Freshest Deals in Your Inbox
                </h1>
                <p className="text-sm md:text-base text-black mt-2 max-w-xl">
                    Sign up for Zapp updates and be the first to know about
                    limited-time offers, new arrivals, and handpicked
                    deals—straight from the farm to your feed.
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                <input
                    type="text"
                    className="bg-white text-black px-4 py-2.5 border border-white/20 rounded-lg outline-none w-full sm:w-auto"
                    placeholder="Enter your email"
                />
                <button className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded-lg active:scale-95 transition-all flex-shrink-0">
                    Subscribe
                    <svg
                        className="w-4 h-4 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                    </svg>
                </button>
            </div>
            <p className="text-black mt-6 text-xs text-center">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates.
            </p>
        </div>
    );
};

export default Newsletter;
