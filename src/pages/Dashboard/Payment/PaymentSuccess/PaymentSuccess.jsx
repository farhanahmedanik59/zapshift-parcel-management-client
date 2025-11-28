import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`).then((res) => console.log(res.data));
    }
  }, [sessionId, axiosSecure]);

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
