// import React, { useEffect } from "react";
// import "./Pay.scss";
// import newRequest from "../../utils/newRequest";
// import { useParams } from "react-router-dom";

// const Pay = () => {
//   const { id } = useParams();

//   useEffect(() => {
//     const makeRequest = async () => {
//       try {
//         // Call backend to create Razorpay order
//         const res = await newRequest.post(`/orders/create-payment-intent/${id}`);

//         const { id: orderId, amount, currency, key } = res.data;

//         // Load Razorpay script
//         const options = {
//           key: key, // RAZORPAY_KEY_ID from backend
//           amount: amount,
//           currency: currency,
//           name: "FreelanceX Marketplace",
//           description: "Secure Payment",
//           order_id: orderId,
//           handler: async function (response) {
//             try {
//               // Confirm payment on backend
//               await newRequest.put("/orders", {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               });
//               window.location.href = "/success"; // redirect to success page
//             } catch (err) {
//               console.error("Payment confirmation failed", err);
//             }
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     makeRequest();
//   }, [id]);

//   return <div className="pay">Processing payment...</div>;
// };

// export default Pay;

// // Pay.jsx
// // import React from "react";
// // import { useParams } from "react-router-dom";
// // import CheckoutForm from "../../components/checkoutForm/CheckoutForm.jsx";

// // const Pay = () => {
// //   const { id } = useParams();
// //   return (
// //     <div>
// //       <h2>Pay for your Gig</h2>
// //       <CheckoutForm gigId={id} />
// //     </div>
// //   );
// // };

// // export default Pay;


// import React, { useEffect } from "react";
// import "./Pay.scss";
// import newRequest from "../../utils/newRequest";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";

// const Pay = () => {
//   const { id } = useParams(); // gigId
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const makeRequest = async () => {
//       try {
//         // Step 1: Create Razorpay order from backend
//         const res = await newRequest.post(`/orders/create-intent/${id}`);
//         const { id: orderId, amount, currency, key } = res.data;

//         // Step 2: Razorpay options
//         const options = {
//           key,
//           amount,
//           currency,
//           name: "FreelanceX Marketplace",
//           description: "Secure Payment",
//           order_id: orderId,
//           handler: async function (response) {
//             try {
//               // Step 3: Confirm payment on backend
//               await newRequest.post("/orders/confirm", {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               });

//               // Step 4: Refresh orders and redirect
//               queryClient.invalidateQueries(["orders"]);
//               navigate("/orders"); // redirect to orders page
//             } catch (err) {
//               console.error("Payment confirmation failed", err);
//               alert("Payment verification failed.");
//             }
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         // Step 5: Open Razorpay checkout
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } catch (err) {
//         console.error("Error creating order", err);
//       }
//     };

//     makeRequest();
//   }, [id, navigate, queryClient]);

//   return <div className="pay">Processing payment...</div>;
// };

// export default Pay;



// import React, { useEffect } from "react";
// import newRequest from "../../utils/newRequest";
// import { useParams, useNavigate } from "react-router-dom";

// const Pay = () => {
//   const { id } = useParams(); // gigId
//   const navigate = useNavigate();

//   useEffect(() => {
//     const makePayment = async () => {
//       try {
//         // Step 1: Create payment intent
//         const res = await newRequest.post(`/orders/create-intent/${id}`);
//         const { orderId, amount, currency } = res.data;

//         // Step 2: Open Razorpay Checkout
//         const options = {
//           key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//           amount,
//           currency,
//           order_id: orderId,
//           name: "Freelance Marketplace",
//           description: "Gig Payment",
//           handler: async function (response) {
//             // Step 3: Confirm payment
//             await newRequest.put("/orders", response);
//             navigate("/orders");
//           },
//           theme: { color: "#3399cc" },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } catch (err) {
//         console.error("Payment error:", err);
//       }
//     };

//     makePayment();
//   }, [id, navigate]);

//   return <div>Processing Payment...</div>;
// };

// export default Pay;



// import React, { useEffect } from "react";
// import newRequest from "../../utils/newRequest";
// import { useParams, useNavigate } from "react-router-dom";

// const Pay = () => {
//   const { id } = useParams(); // gigId
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       return new Promise((resolve) => {
//         if (window.Razorpay) {
//           resolve(true);
//           return;
//         }
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };

//     const makePayment = async () => {
//       try {
//         // Ensure Razorpay script is loaded
//         const scriptLoaded = await loadRazorpayScript();
//         if (!scriptLoaded) {
//           alert("Failed to load Razorpay SDK. Please try again.");
//           return;
//         }

//         // Step 1: Create payment intent (order)
//         const res = await newRequest.post(`/orders/create-intent/${id}`);
//         const { id: orderId, amount, currency, key } = res.data;

//         // Step 2: Open Razorpay Checkout
//         const options = {
//           key, // ✅ from backend
//           amount,
//           currency,
//           order_id: orderId,
//           name: "Freelance Marketplace",
//           description: "Gig Payment",
//           handler: async function (response) {
//             try {
//               // ✅ Step 3: Send all details to backend
//               await newRequest.put("/orders/confirm", {
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//               });

//               navigate("/orders"); // redirect on success
//             } catch (err) {
//               console.error("Payment confirmation failed:", err);
//               alert("Payment verification failed!");
//             }
//           },
//           theme: { color: "#3399cc" },
//           modal: {
//             ondismiss: function () {
//     navigate(`/gig/${id}`);
              
//             },
//           },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } catch (err) {
//         console.error("Payment error:", err);
//       }
//     };

//     makePayment();
//   }, [id, navigate]);

//   return <div>Processing Payment...</div>;
// };

// export default Pay;


// import React, { useEffect } from "react";
// import newRequest from "../../utils/newRequest";
// import { useParams, useNavigate } from "react-router-dom";

// const Pay = () => {
//   const { id } = useParams(); // gigId
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       return new Promise((resolve) => {
//         if (window.Razorpay) {
//           resolve(true);
//           return;
//         }
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//       });
//     };

//     const makePayment = async () => {
//       try {
//         // ✅ Step 1: Ask backend to create payment intent
//         const res = await newRequest.post(`/orders/create-intent/${id}`);
//         const { id: orderId, amount, currency, key } = res.data;

//         // ✅ Step 2: Load Razorpay SDK
//         const scriptLoaded = await loadRazorpayScript();
//         if (!scriptLoaded) {
//           alert("Failed to load Razorpay SDK. Please try again.");
//           return;
//         }

//         // ✅ Step 3: Razorpay options
//         const options = {
//           key, 
//           amount,
//           currency,
//           order_id: orderId,
//           name: "Freelance Marketplace",
//           description: "Gig Payment",
//           handler: async function (response) {
//             try {
//               await newRequest.put("/orders/confirm", {
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_signature: response.razorpay_signature,
//               });

//               navigate("/orders"); // redirect to orders page
//             } catch (err) {
//               console.error("Payment confirmation failed:", err);
//               alert("Payment verification failed!");
//             }
//           },
//           theme: { color: "#3399cc" },
//           modal: {
//             ondismiss: function () {
//               navigate(`/gig/${id}`); // if user closes payment modal
//             },
//           },
//         };

//         // ✅ Step 4: Open Razorpay Checkout
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } catch (err) {
//         // ✅ Handle seller self-purchase case
//         if (err.response?.status === 403) {
//           alert("❌ You cannot buy your own gig!");
//           navigate(`/gig/${id}`);
//         } else {
//           console.error("Payment error:", err);
//           alert("Something went wrong. Please try again.");
//           navigate(`/gig/${id}`);
//         }
//       }
//     };

//     makePayment();
//   }, [id, navigate]);

//   return <div>Processing Payment...</div>;
// };

// export default Pay;


import React, { useEffect, useRef } from "react";
import newRequest from "../../utils/newRequest";
import { useParams, useNavigate } from "react-router-dom";

const Pay = () => {
  const { id } = useParams(); // gigId
  const navigate = useNavigate();
  // Use a useRef hook to prevent multiple API calls on re-renders
  const hasCalled = useRef(false);

  useEffect(() => {
    // Check if the function has already been called
    if (hasCalled.current) {
      return;
    }
    hasCalled.current = true;

    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const makePayment = async () => {
      try {
        // ✅ Step 1: Ask backend to create payment intent
        const res = await newRequest.post(`/orders/create-intent/${id}`);
        const { id: orderId, amount, currency, key } = res.data;

        // ✅ Step 2: Load Razorpay SDK
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert("Failed to load Razorpay SDK. Please try again.");
          return;
        }

        // ✅ Step 3: Razorpay options
        const options = {
          key,
          amount,
          currency,
          order_id: orderId,
          name: "Freelance Marketplace",
          description: "Gig Payment",
          handler: async function (response) {
            try {
              await newRequest.put("/orders/confirm", {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              });

              navigate("/orders"); // redirect to orders page
            } catch (err) {
              console.error("Payment confirmation failed:", err);
              alert("Payment verification failed!");
              navigate(`/gig/${id}`);
            }
          },
          theme: { color: "#3399cc" },
          modal: {
            ondismiss: function () {
              navigate(`/gig/${id}`);
            },
          },
        };

        // ✅ Step 4: Open Razorpay Checkout
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        // Handle all errors here, including the 403 (Forbidden) error.
        if (err.response?.status === 403) {
          alert("❌ You cannot buy your own gig!");
        } else {
          console.error("Payment error:", err);
          alert("Something went wrong. Please try again.");
        }
        navigate(`/gig/${id}`);
      }
    };

    makePayment();
  }, [id, navigate]);

  return <div>Processing Payment...</div>;
};

export default Pay;