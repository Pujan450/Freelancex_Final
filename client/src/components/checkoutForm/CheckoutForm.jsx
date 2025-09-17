import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckoutForm = ({ gigId }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load Razorpay script dynamically
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

    loadRazorpayScript();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        setMessage("Payment gateway is loading, please try again in a moment.");
        setIsLoading(false);
        return;
      }

      // Create payment intent
      const { data } = await axios.post(`/api/orders/create-payment-intent/${gigId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "FreelanceX",
        description: data.title || "Gig Payment",
        order_id: data.id,
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        theme: {
          color: "#3399cc"
        },
        handler: async function (response) {
          try {
            await axios.put("/api/orders", response, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setMessage("Payment succeeded! Redirecting...");
            setTimeout(() => {
              window.location.href = "/orders";
            }, 2000);
          } catch (err) {
            console.error("Payment verification failed:", err);
            setMessage("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            setMessage("Payment cancelled");
            setIsLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (err) {
      console.error("Payment error:", err);
      setMessage(err.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h3>Complete Payment</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? "Processing..." : `Pay Now`}
        </button>

        {message && (
          <div style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: message.includes("succeed") ? "#d4edda" : "#f8d7da",
            border: message.includes("succeed") ? "1px solid #c3e6cb" : "1px solid #f5c6cb",
            borderRadius: "4px",
            color: message.includes("succeed") ? "#155724" : "#721c24"
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;