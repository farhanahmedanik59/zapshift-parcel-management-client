import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { GrUserAdmin } from "react-icons/gr";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  const handleUserRole = (_id, role) => {
    const userInfo = { id: _id, role: role };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch("/users", userInfo).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: `${role === "admin" ? "Set As Admin" : "Removed from admin"}`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });

    refetch();
  };
  return (
    <div className="overflow-x-auto">
      <div>
        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Type here" className="p-1.5 rounded-md border mt-3 ml-2 " />
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>CreatedAt</th>
            <th>User-Role</th>
            <th>Admin-Actions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>
                <h1>{index + 1}</h1>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.displayName}</div>
                  </div>
                </div>
              </td>
              <td>
                <span>{user.email}</span>
              </td>
              <td>{user.createdAt}</td>
              <td>{user.role}</td>
              <td>
                {user.role === "admin" ? (
                  <button
                    onClick={() => {
                      handleUserRole(user._id, "user");
                    }}
                    className="btn btn-primary text-black"
                  >
                    <FiShieldOff></FiShieldOff> Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleUserRole(user._id, "admin");
                    }}
                    className="btn btn-primary text-black "
                  >
                    <GrUserAdmin /> Make Admin
                  </button>
                )}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersManagement;
