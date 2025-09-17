// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import newRequest from "../../utils/newRequest";

// const Success = () => {
//   const { search } = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(search);

//   // Razorpay callback values
//   const razorpay_payment_id = params.get("razorpay_payment_id");
//   const razorpay_order_id = params.get("razorpay_order_id");
//   const razorpay_signature = params.get("razorpay_signature");

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         // send payment details to backend for verification
//         await newRequest.post("/orders/verify", {
//           razorpay_payment_id,
//           razorpay_order_id,
//           razorpay_signature,
//         });

//         setTimeout(() => {
//           navigate("/orders");
//         }, 5000);
//       } catch (err) {
//         console.log("Payment verification failed:", err);
//       }
//     };

//     if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
//       verifyPayment();
//     }
//   }, [razorpay_payment_id, razorpay_order_id, razorpay_signature, navigate]);

//   return (
//     <div>
//       Payment successful 🎉. You are being redirected to the orders page.  
//       Please do not close the page.
//     </div>
//   );
// };

// export default Success;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Payment successful 🎉");

  useEffect(() => {
    // Optional: auto-redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/orders");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
      <p>You are being redirected to your orders page.</p>
      <p>Please do not close this page.</p>
      <button onClick={() => navigate("/orders")} style={{ marginTop: "20px" }}>
        Go to Orders Now
      </button>
    </div>
  );
};

export default Success;
