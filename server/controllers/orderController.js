import Product from "../models/product.js";
import Order from "../models/order.js";
import stripe from "stripe";
import User from "../models/user.js";

//Place order by COD: api/order/cod
export const placeOrderByCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId; //from authUser

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        // Calculate total amount
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            amount += product.offerPrice * item.quantity;
        }

        //Add tax charge (7%)
        amount += Math.floor(amount * 0.07);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        // Clear user's cart after successful order
        await User.findByIdAndUpdate(userId, { cartItems: {} });

        return res.json({
            success: true,
            message: "Order placed successfully!",
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        let productData = [];

        // Calculate total amount
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            amount += product.offerPrice * item.quantity;
        }

        //Add tax charge (7%)
        amount += Math.floor(amount * 0.07);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Stripe",
            isPaid: false, // Explicitly set isPaid to false
        });
        //stripe gateway initialise
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
        //create line items for stripe
        const lineItems = productData.map((item) => {
            // Convert INR to USD by dividing by 87
            const priceInUSD = (item.price + item.price * 0.07) / 87; //inr to usd
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(priceInUSD * 100), // Convert to cents
                },
                quantity: item.quantity,
            };
        });

        //create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders&clear_cart=true`,
            cancel_url: `${origin}/cart?payment_canceled=true`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            },
        });

        return res.json({
            success: true,
            url: session.url,
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//Stripe Webhooks to Verify Payment Action: /stripe
export const stripeWebHooks = async (req, res) => {
    //stripe gateway initialise
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    //create line items for stripe
    const signature = req.headers["stripe-signature"];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }

    //handle event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;
            //getting session from metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });
            const { orderId, userId } = session.data[0].metadata;
            //Mark Payment as Paid
            await Order.findByIdAndUpdate(orderId, { isPaid: true });
            //Clear user cart only after successful payment
            await User.findByIdAndUpdate(userId, { cartItems: {} });
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            // Getting Session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });
            const { orderId } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
        case "checkout.session.expired": {
            // Handle expired checkout sessions
            const session = event.data.object;
            const { orderId } = session.metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
        default: {
            console.error(`Unhandled event type: ${event.type}`);
            break;
        }
    }
    res.json({ recieved: true });
};

//Get orders by UserID: api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }], //// Match EITHER of these conditions:
        })
            .populate("items.product") //// Get full product and address details
            .sort({ createdAt: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

//Get all Orders (for admin): api/order/seller
export const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }],
        })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
