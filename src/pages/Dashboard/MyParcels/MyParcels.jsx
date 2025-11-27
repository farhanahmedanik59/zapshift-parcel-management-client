import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myPercel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              icon: "success",
              title: "deleted",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Reciver Name</th>
            <th>Reciver Region</th>
            <th>Cost</th>

            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {parcels.map((parcel, index) => (
            <tr>
              <th>{index + 1}</th>
              <td>{parcel.parcelName}</td>
              <td>{parcel.receiverName}</td>
              <td>{parcel.senderRegion}</td>
              <td>{parcel.cost}</td>
              <td>
                {parcel.paymentStatus === "paid" ? (
                  <button className="btn bg-primary text-green-500 ">Paid</button>
                ) : (
                  <Link to={`/dashboard/payment/${[parcel._id]}`}>
                    <button className="btn bg-primary text-red-500">Pay</button>
                  </Link>
                )}
              </td>

              <td>
                <button className="btn hover:bg-primary ">
                  <FaMagnifyingGlass></FaMagnifyingGlass>Search
                </button>
                <button className="btn mx-1.5 hover:bg-primary ">
                  <FiEdit></FiEdit>Edit
                </button>
                <button onClick={() => handleDelete(parcel._id)} className="btn hover:bg-primary ">
                  <MdDeleteForever></MdDeleteForever>Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
