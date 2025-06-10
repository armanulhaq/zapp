import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import main_banner_bg from "./main_banner_bg.jpg";
import main_banner_bg_sm from "./main_banner_bg_sm.jpg";
import bottom_banner_image from "./bottom_banner_image.jpg";
import bottom_banner_image_sm from "./bottom_banner_sm.jpg";
import add_address_iamge from "./add_address_image.svg";
import fresh_fruits_image from "./fresh_fruits_image.png";
import organic_vegitable_image from "./organic_vegitable_image.png";
import bottles_image from "./bottles_image.png";
import maggi_image from "./maggi_image.png";
import dairy_product_image from "./dairy_product_image.png";
import bakery_image from "./bakery_image.png";
import grain_image from "./grain_image.png";
import empty_box from "./empty_box.svg";

export const assets = {
    search_icon,
    remove_icon,
    arrow_right_icon_colored,
    star_icon,
    star_dull_icon,
    cart_icon,
    nav_cart_icon,
    add_icon,
    refresh_icon,
    product_list_icon,
    order_icon,
    upload_area,
    profile_icon,
    menu_icon,
    delivery_truck_icon,
    leaf_icon,
    coin_icon,
    trust_icon,
    black_arrow_icon,
    white_arrow_icon,
    main_banner_bg,
    main_banner_bg_sm,
    bottom_banner_image,
    add_address_iamge,
    box_icon,
    fresh_fruits_image,
    organic_vegitable_image,
    bottles_image,
    maggi_image,
    bakery_image,
    grain_image,
    bottom_banner_image_sm,
    empty_box,
};

export const categories = [
    {
        text: "Organic veggies",
        path: "Vegetables",
        image: organic_vegitable_image,
        bgColor: "#fff6cc",
    },
    {
        text: "Fresh Fruits",
        path: "Fruits",
        image: fresh_fruits_image,
        bgColor: "#fff6cc",
    },
    {
        text: "Cold Drinks",
        path: "Drinks",
        image: bottles_image,
        bgColor: "#fff6cc",
    },
    {
        text: "Instant Food",
        path: "Instant",
        image: maggi_image,
        bgColor: "#fff6cc",
    },
    {
        text: "Dairy Products",
        path: "Dairy",
        image: dairy_product_image,
        bgColor: "#fff6cc",
    },
    {
        text: "Bakery & Breads",
        path: "Bakery",
        image: bakery_image,
        bgColor: "#fff6cc",
    },
    {
        text: "Grains & Cereals",
        path: "Grains",
        image: grain_image,
        bgColor: "#fff6cc",
    },
];

export const footerLinks = [
    {
        title: "Quick Links",
        links: [
            { text: "Home", url: "#" },
            { text: "Best Sellers", url: "#" },
            { text: "Offers & Deals", url: "#" },
            { text: "Contact Us", url: "#" },
            { text: "FAQs", url: "#" },
        ],
    },
    {
        title: "Need help?",
        links: [
            { text: "Delivery Information", url: "#" },
            { text: "Return & Refund Policy", url: "#" },
            { text: "Payment Methods", url: "#" },
            { text: "Track your Order", url: "#" },
            { text: "Contact Us", url: "#" },
        ],
    },
    {
        title: "Follow Us",
        links: [
            { text: "Instagram", url: "#" },
            { text: "Twitter", url: "#" },
            { text: "Facebook", url: "#" },
            { text: "YouTube", url: "#" },
        ],
    },
];

export const features = [
    {
        icon: delivery_truck_icon,
        title: "Fastest Delivery",
        description: "Groceries delivered in under 30 minutes.",
    },
    {
        icon: leaf_icon,
        title: "Freshness Guaranteed",
        description: "Fresh produce straight from the source.",
    },
    {
        icon: coin_icon,
        title: "Affordable Prices",
        description: "Quality groceries at unbeatable prices.",
    },
    {
        icon: trust_icon,
        title: "Trusted by Thousands",
        description: "Loved by 10,000+ happy customers.",
    },
];
