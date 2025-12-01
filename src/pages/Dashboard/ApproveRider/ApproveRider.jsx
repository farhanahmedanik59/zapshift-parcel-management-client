import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import Swal from "sweetalert2";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: riders = [],
    isloadig,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  const reject = (_id, status, email) => {
    const updateInfo = { status: status, email: email };
    axiosSecure.patch(`/riders/${_id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Rider Approved!",
          text: "You approved  the rider!",
          icon: "success",
        });
        refetch();
      }
    });
  };
  const approve = (_id, status, email) => {
    const updateInfo = { status: status, email: email };
    axiosSecure.patch(`/riders/${_id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          title: "Rider Approved!",
          text: "You approved  the rider!",
          icon: "success",
        });
        refetch();
      }
    });
  };

  const handleApprove = (_id, email) => {
    approve(_id, "approved", email);
  };
  const handlerejected = (_id, email) => {
    reject(_id, "rejected", email);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>District</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {riders.map((rider, index) => (
            <tr>
              <th>{index + 1}</th>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.region}</td>
              <td>{rider.district}</td>
              <td className={rider.status === "approved" ? "text-green-500" : "text-red-500"}>{rider.status}</td>
              <td>
                <button
                  onClick={() => {
                    handleApprove(rider._id, rider.email);
                  }}
                  className="btn"
                >
                  <FaUserCheck></FaUserCheck>
                </button>
                <button onClick={() => handlerejected(rider._id, rider.email)} className="md:mx-1.5 btn">
                  <IoPersonRemove></IoPersonRemove>
                </button>
                <button className="btn">
                  <IoMdTrash></IoMdTrash>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveRider;
