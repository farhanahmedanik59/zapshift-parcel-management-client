import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders = [], isloadig } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  const handleApprove = (_id) => {
    console.log(_id);
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
              <td>
                <button
                  onClick={() => {
                    handleApprove(rider._id);
                  }}
                  className="btn"
                >
                  <FaUserCheck></FaUserCheck>
                </button>
                <button className="btn">
                  <IoPersonRemove></IoPersonRemove>
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
