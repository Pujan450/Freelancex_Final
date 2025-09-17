
// MAIN ccccc

// import createError from "../utils/createError.js";
// import Order from "../models/order.model.js";
// import Gig from "../models/gig.model.js";
// import Razorpay from "razorpay";
// import crypto from "crypto";

// export const intent = async (req, res, next) => {
//   try {
//     // ✅ Initialize INSIDE function like Stripe does
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const gig = await Gig.findById(req.params.id);
//     if (!gig) return next(createError(404, "Gig not found"));

//     const options = {
//       amount: gig.price * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     const newOrder = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       buyerId: req.userId,
//       sellerId: gig.userId,
//       price: gig.price,
//       payment_intent: razorpayOrder.id,
//       razorpay_order_id: razorpayOrder.id,
//       isCompleted: false,
//     });

//     await newOrder.save();

//     res.status(200).json({
//       id: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // getOrders and confirm functions remain the same...


// // Step 2: Get Orders
// export const getOrders = async (req, res, next) => {
//   try {
//     const orders = await Order.find({
//       ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
//       isCompleted: true,
//     });
//     res.status(200).json(orders);
//   } catch (err) {
//     next(err);
//   }
// };

// // Step 3: Confirm Payment
// export const confirm = async (req, res, next) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     // Verify payment signature
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       return next(createError(400, "Payment verification failed"));
//     }

//     // Update order status
//     const order = await Order.findOneAndUpdate(
//       { razorpay_order_id: razorpay_order_id },
//       { 
//         $set: { 
//           isCompleted: true, 
//           razorpay_payment_id,
//           payment_intent: razorpay_payment_id 
//         }
//       },
//       { new: true }
//     );

//     if (!order) return next(createError(404, "Order not found"));

//     res.status(200).json({ message: "Order has been confirmed.", order });
//   } catch (err) {
//     next(err);
//   }
// };


// import createError from "../utils/createError.js";
// import Order from "../models/order.model.js";
// import Gig from "../models/gig.model.js";
// import Razorpay from "razorpay";
// import crypto from "crypto";

// // Step 1: Create Razorpay Order (Intent)
// export const intent = async (req, res, next) => {
//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const gig = await Gig.findById(req.params.id);
//     if (!gig) return next(createError(404, "Gig not found"));

//      if (gig.userId.toString() === req.userId) {
//       return next(createError(403, "You cannot buy your own gig!"));
//     }
    
//     const options = {
//       amount: gig.price * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     const newOrder = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       buyerId: req.userId,
//       sellerId: gig.userId,
//       price: gig.price,
//       payment_intent: razorpayOrder.id,
//       razorpayOrderId: razorpayOrder.id,
//       isCompleted: false,
//     });

//     await newOrder.save();

//     res.status(200).json({
//       id: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // Step 2: Get Orders
// export const getOrders = async (req, res, next) => {
//   try {
//     const orders = await Order.find({
//       ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
//       isCompleted: true, // Only show completed orders
//     });
//     res.status(200).send(orders);
//   } catch (err) {
//     next(err);
//   }
// };

// // Step 3: Confirm Payment
// export const confirm = async (req, res, next) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return next(createError(400, "Missing payment details"));
//     }

//     console.log("🔹 Incoming Payload:", req.body);

//     // Generate signature to verify
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");

//     console.log("🔹 Generated Signature:", generatedSignature);
//     console.log("🔹 Sent Signature:", razorpay_signature);

//     if (generatedSignature !== razorpay_signature) {
//       return next(createError(400, "Payment verification failed"));
//     }

//     // ✅ Update order in DB
//     const order = await Order.findOneAndUpdate(
//       { razorpayOrderId: razorpay_order_id },
//       {
//         $set: {
//           isCompleted: true,
//           razorpayPaymentId: razorpay_payment_id,
//           payment_intent: razorpay_payment_id,
//         },
//       },
//       { new: true }
//     );

//     if (!order) return next(createError(404, "Order not found"));

//     res.status(200).json({ message: "✅ Order confirmed", order });
//   } catch (err) {
//     next(err);
//   }
// };


import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Step 1: Create Razorpay Order (Intent)
export const intent = async (req, res, next) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"));

    if (gig.userId.toString() === req.userId) {
      return next(createError(403, "You cannot buy your own gig!"));
    }

    const options = {
      amount: gig.price * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: razorpayOrder.id,
      razorpayOrderId: razorpayOrder.id,
      isCompleted: false,
    });

    await newOrder.save();

    res.status(200).json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    next(err);
  }
};

// Step 2: Get Orders
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true, // Only show completed orders
    });
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

// Step 3: Confirm Payment
export const confirm = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return next(createError(400, "Missing payment details"));
    }

    // Generate signature to verify
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return next(createError(400, "Payment verification failed"));
    }

    // ✅ Update order in DB
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          isCompleted: true,
          razorpayPaymentId: razorpay_payment_id,
          payment_intent: razorpay_payment_id,
        },
      },
      { new: true }
    );

    if (!order) return next(createError(404, "Order not found"));

    res.status(200).json({ message: "✅ Order confirmed", order });
  } catch (err) {
    next(err);
  }
};
