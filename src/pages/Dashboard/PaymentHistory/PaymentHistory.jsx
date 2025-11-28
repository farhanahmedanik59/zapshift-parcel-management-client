import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["history", user.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/payments?email=${user.email}`);
      return result.data;
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Parcel Number</th>
            <th>Parcel Info</th>
            <th>Tnx Number</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {history.map((his, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{his.parcelName}</td>
                <td>{his.tnxId}</td>
                <td>{his.amount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
