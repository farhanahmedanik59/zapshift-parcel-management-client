import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loading  loading-infinity loading-xl"></span>
      </div>
    );
  }
  const handleCheckOut = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-3xl shadow-xl rounded-2xl p-8 space-y-8 border border-gray-200">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 pb-4 border-b">📦 Parcel Details</h1>

          {/* Parcel Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Parcel Type</p>
              <p className="text-lg font-semibold">{parcel.parcelType}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Parcel Name</p>
              <p className="text-lg font-semibold">{parcel.parcelName}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Weight</p>
              <p className="text-lg font-semibold">{parcel.parcelWeight} kg</p>
            </div>
          </div>

          {/* Sender Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Sender Information</h2>
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{parcel.senderName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{parcel.senderPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium">{parcel.senderRegion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">District</p>
                <p className="font-medium">{parcel.senderDistrict}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{parcel.senderAddress}</p>
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Receiver Information</h2>
            <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{parcel.receiverName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{parcel.receiverPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium">{parcel.receiverRegion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">District</p>
                <p className="font-medium">{parcel.receiverDistrict}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{parcel.receiverAddress}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Pickup Instruction</p>
              <p className="font-medium">{parcel.pickupInstruction}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivery Instruction</p>
              <p className="font-medium">{parcel.deliveryInstruction}</p>
            </div>
          </div>

          {/* Parcel Cost */}
          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Parcel Cost</h2>
            <p className="text-2xl font-bold text-green-600">{parcel.cost} Tk</p>
          </div>

          {/* Pay Button */}
          <div className="flex justify-end pt-4">
            <button onClick={handleCheckOut} className="px-6 py-3 rounded-xl bg-primary hover:-translate-y-1 text-white font-semibold transition">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
