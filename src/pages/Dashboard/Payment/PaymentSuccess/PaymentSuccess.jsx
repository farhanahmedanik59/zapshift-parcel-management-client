import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard/myparcels"); // go back to dashboard
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ color: "green" }}>🎉 Payment Successful!</h1>
      <p>Your payment has been processed successfully.</p>
      <button
        onClick={handleBackToDashboard}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to My Parcels
      </button>
    </div>
  );
};

export default PaymentSuccess;
